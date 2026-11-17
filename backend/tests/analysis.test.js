const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const parseAnalysisResponse = require("../utils/parseAnalysisResponse");

const validAnalysis = () => ({
  score: 75,
  keywords_present: ["React"],
  keywords_missing: [],
  strengths: ["Built a React application"],
  weaknesses: [],
  suggestions: [],
});
const responseFor = (data) => ({
  status: "completed",
  output_text: JSON.stringify(data),
});

test("accepts valid results, empty lists, and score boundaries", () => {
  for (const score of [0, 75, 100]) {
    const data = { ...validAnalysis(), score };
    assert.deepEqual(parseAnalysisResponse(responseFor(data)), data);
  }
});

test("accepts enclosing JSON fences but rejects surrounding prose", () => {
  const json = JSON.stringify(validAnalysis());
  const closingFence = "```";
  for (const fence of ["```json", "```", "```JSON"]) {
    assert.deepEqual(
      parseAnalysisResponse({ status: "completed", output_text: `${fence}\n${json}\n${closingFence}` }),
      validAnalysis(),
    );
  }
  assert.throws(() => parseAnalysisResponse({
    status: "completed", output_text: `Here is the result: ${json}`,
  }));
});

test("rejects incomplete responses even when their JSON is valid", () => {
  for (const status of ["incomplete", "failed", "in_progress", undefined]) {
    assert.throws(() => parseAnalysisResponse({
      ...responseFor(validAnalysis()), status,
    }));
  }
});

test("rejects empty, truncated, and non-object output", () => {
  for (const output_text of ["", "   ", '{"score":', "null", "[]", "75", '"text"']) {
    assert.throws(() => parseAnalysisResponse({ status: "completed", output_text }));
  }
  assert.throws(() => parseAnalysisResponse(undefined));
});

test("reads only final message text in the output fallback", () => {
  const output = [
    { type: "reasoning", content: [{ type: "reasoning_text", text: "not JSON" }] },
    { type: "message", content: [
      { type: "refusal", text: "not final text" },
      { type: "output_text", text: JSON.stringify(validAnalysis()) },
    ] },
  ];
  assert.deepEqual(parseAnalysisResponse({ status: "completed", output }), validAnalysis());
  assert.throws(() => parseAnalysisResponse({ status: "completed", output: output.slice(0, 1) }));
});

test("requires exactly the expected fields, including for ownership injection", () => {
  for (const field of Object.keys(validAnalysis())) {
    const data = validAnalysis();
    delete data[field];
    assert.throws(() => parseAnalysisResponse(responseFor(data)));
  }
  for (const field of ["userId", "jobDescription", "resume_text", "improved_resume", "extra"]) {
    assert.throws(() => parseAnalysisResponse(responseFor({
      ...validAnalysis(), [field]: "untrusted value",
    })));
  }
});

test("rejects invalid score types and ranges without coercion", () => {
  for (const score of [-1, 101, 999, 50.5, "75", null, true]) {
    assert.throws(() => parseAnalysisResponse(responseFor({ ...validAnalysis(), score })));
  }
});

test("requires arrays of nonempty strings for every feedback field", () => {
  for (const field of Object.keys(validAnalysis()).filter((key) => key !== "score")) {
    for (const value of [null, "React", {}, [42], [null], [{}], [""], ["  "]]) {
      assert.throws(() => parseAnalysisResponse(responseFor({
        ...validAnalysis(), [field]: value,
      })));
    }
  }
});

// Run the actual route with isolated dependencies: no network, real CV, or database.
const source = fs.readFileSync(path.join(__dirname, "../server.js"), "utf8");
async function runAnalyze(options = {}) {
  const routes = new Map();
  const saved = [];
  const removed = [];
  const app = {
    use() {}, get() {}, delete() {}, listen() {},
    post(route, ...handlers) { routes.set(route, handlers); },
  };
  const mocks = {
    cors: () => () => {}, bcrypt: {}, "./models/User": {},
    openai: class {
      constructor() {
        this.responses = { create: async () => {
          if (options.providerFailure) throw new Error("Provider unavailable");
          return options.response || responseFor(validAnalysis());
        } };
      }
    },
    dotenv: { config() {} }, "./config/db": () => {}, jsonwebtoken: {},
    "./middleware/auth": () => {},
    multer: () => ({ single: () => () => {} }),
    fs: {
      readFileSync: () => Buffer.from("synthetic PDF"),
      promises: { unlink: async (file) => {
        removed.push(file);
        if (options.cleanupFailure) throw Object.assign(new Error("Cleanup failed"), { code: "EACCES" });
      } },
    },
    express: Object.assign(() => app, { json: () => () => {} }),
    "express-rate-limit": () => () => {},
    "pdf-parse": async () => {
      if (options.pdfFailure) throw new Error("Bad PDF");
      return { text: "Synthetic React resume" };
    },
    "./models/Analysis": { create: async (data) => {
      saved.push(data);
      if (options.dbFailure) throw new Error("Database unavailable");
      return { ...data, _id: "saved-analysis" };
    } },
    "./utils/parseAnalysisResponse": parseAnalysisResponse,
  };
  vm.runInNewContext(source, {
    require(name) {
      if (!Object.hasOwn(mocks, name)) throw new Error(`Unexpected dependency: ${name}`);
      return mocks[name];
    },
    process: { env: {} }, console: { log() {}, error() {} },
  });
  const req = {
    user: { id: "authenticated-user" }, body: { jobDescription: "React developer" },
    file: options.noFile ? undefined : { path: "synthetic-upload", mimetype: options.mime || "application/pdf" },
  };
  const res = {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(body) { this.body = body; return this; },
  };
  await routes.get("/api/ai/analyze").at(-1)(req, res);
  return { res, saved, removed };
}

test("route rejects unusable AI results without saving and removes upload", async () => {
  const invalid = [
    { ...responseFor(validAnalysis()), status: "incomplete" },
    { status: "completed", output_text: '{"score":' },
    responseFor({ ...validAnalysis(), score: 999 }),
    responseFor({ ...validAnalysis(), userId: "other-user" }),
    responseFor({ ...validAnalysis(), jobDescription: "replaced" }),
  ];
  for (const response of invalid) {
    const { res, saved, removed } = await runAnalyze({ response });
    assert.equal(res.statusCode, 502);
    assert.match(res.body.error, /Please try again/);
    assert.equal(saved.length, 0);
    assert.deepEqual(removed, ["synthetic-upload"]);
  }
});

test("route saves legitimate zero with server-owned fields and removes upload", async () => {
  const { res, saved, removed } = await runAnalyze({
    response: responseFor({ ...validAnalysis(), score: 0 }),
  });
  assert.equal(res.statusCode, 200);
  assert.equal(saved.length, 1);
  assert.equal(saved[0].score, 0);
  assert.equal(saved[0].userId, "authenticated-user");
  assert.equal(saved[0].jobDescription, "React developer");
  assert.equal(saved[0].resume_text, "Synthetic React resume");
  assert.equal(saved[0].improved_resume, null);
  assert.equal(res.body._id, "saved-analysis");
  assert.deepEqual(removed, ["synthetic-upload"]);
});

test("route cleans up rejected MIME types and PDF/provider/database failures", async () => {
  for (const options of [
    { mime: "text/plain" }, { pdfFailure: true },
    { providerFailure: true }, { dbFailure: true },
  ]) {
    const { res, removed } = await runAnalyze(options);
    assert.equal(res.statusCode, options.mime ? 400 : 500);
    assert.deepEqual(removed, ["synthetic-upload"]);
  }
});

test("route handles missing uploads without attempting deletion", async () => {
  const { res, removed, saved } = await runAnalyze({ noFile: true });
  assert.equal(res.statusCode, 400);
  assert.equal(removed.length, 0);
  assert.equal(saved.length, 0);
});

test("cleanup failure does not replace a successful response", async () => {
  const { res, saved } = await runAnalyze({ cleanupFailure: true });
  assert.equal(res.statusCode, 200);
  assert.equal(saved.length, 1);
});
