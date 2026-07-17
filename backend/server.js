const OpenAI = require("openai");
const dotenv = require("dotenv");

const multer = require("multer");
const fs = require("fs");
const express = require("express");

const pdfParse = require("pdf-parse");
// console.log("FULL MODULE:", pdfParseModule);
// console.log("TYPE:", typeof pdfParseModule);
// console.log(pdfParse);
dotenv.config();
const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const upload = multer({ dest: "uploads/" });
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// app.post("/api/test", (req, res) => {
//     const { name, text } = req.body;
//     res.json({
//         score: 66,
//         feedback: "do better next time"
//     })
// });

app.post("/api/analyze", upload.single("resume"), async (req, res) => {
  try {
    console.log("request received");
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    //Check file type
    if (req.file.mimetype !== "application/pdf") {
      return res.status(400).json({ error: "Only PDF files are allowed" });
    }

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    const jobDescription = req.body.jobDescription || "";
    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;
    const cleanedText = text.replace(/\s+/g, " ").trim();
    const limitedText = cleanedText.slice(0, 8000); // Limit to first 8000 characters

    const aiResponse = await openai.responses.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      input: `
            You are a strict professional resume reviewer.

            You are an advanced ATS (Applicant Tracking System) resume analyzer.

            You will be given:
            1. A JOB DESCRIPTION
            2. A RESUME

            Your job is to extract, compare, and evaluate keywords accurately.

            ========================
            DEFINITIONS (VERY IMPORTANT)
            ========================

            - "keywords_present":
              Keywords that appear in BOTH the job description AND the resume.

            - "keywords_missing":
              Keywords that appear in the job description BUT DO NOT appear in the resume.

            These must be based ONLY on the job description.
            Do NOT include keywords that exist only in the resume.

            ========================
            STRICT RULES
            ========================

            - Return ONLY valid JSON (no explanation, no text outside JSON)
            - Be strict and realistic like a real ATS system
            - Do NOT leave arrays empty (unless absolutely unavoidable)
            - Extract ONLY meaningful professional keywords:
              (skills, technologies, tools, frameworks, roles, certifications)
            - IGNORE soft skills
            - Normalize similar terms:
              (React.js = React, Node.js = Node, JS = JavaScript)
            - Avoid duplicates
            - Return at least 5–15 keywords if possible

            ========================
            PROCESS
            ========================

            1. Extract keywords from the JOB DESCRIPTION
            2. Extract keywords from the RESUME
            3. Compare both lists carefully
            4. Build:
              - keywords_present
              - keywords_missing
            5. Calculate ATS score (0–100)
            6. Provide strengths, weaknesses, suggestions

            ========================
            RETURN FORMAT
            ========================

            {
              "score": number,
              "strengths": string[],
              "weaknesses": string[],
              "suggestions": string[],
              "keywords_present": string[],
              "keywords_missing": string[]
            }

            ========================
            INPUT
            ========================

            JOB DESCRIPTION:
            ${jobDescription}

            RESUME:
            ${limitedText}
            `,
    });

    const result = aiResponse.output_text;
    let parsed;
    try {
      const clean = result.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.log("Failed to parse AI response as JSON:", e);

      parsed = {
        score: 0,
        strengths: [],
        weaknesses: [],
        suggestions: [],
        keywords_present: [],
        keywords_missing: [],
      };
    }
    console.log("AI Response:", result);

    try {
      // Clean up the uploaded file
      fs.unlinkSync(filePath);
    } catch (e) {
      console.log("File cleanup failed:", e);
    }
    res.json(parsed);
  } catch (err) {
    console.error("PDF parsing error:", err);
    res.status(500).json({ error: "Failed to analyze file" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
