const feedbackFields = [
  "keywords_present",
  "keywords_missing",
  "strengths",
  "weaknesses",
  "suggestions",
];

function parseAnalysisResponse(response) {
  if (response?.status !== "completed") {
    throw new Error("AI response is not completed");
  }

  const text =
    response.output_text ||
    (Array.isArray(response.output)
      ? response.output
          .filter((item) => item.type === "message")
          .flatMap((item) => item.content || [])
          .filter((content) => content.type === "output_text")
          .map((content) => content.text || "")
          .join("")
      : "");

  if (typeof text !== "string" || !text.trim()) {
    throw new Error("AI response has no final text");
  }

  const trimmed = text.trim();
  const fence = trimmed.match(/^```(?:json)?\s*\n?([\s\S]*?)\n?```$/i);
  const data = JSON.parse(fence ? fence[1].trim() : trimmed);

  if (data === null || typeof data !== "object" || Array.isArray(data)) {
    throw new Error("Analysis must be a JSON object");
  }

  const expectedFields = ["score", ...feedbackFields];
  if (
    Object.keys(data).length !== expectedFields.length ||
    expectedFields.some((field) => !Object.hasOwn(data, field))
  ) {
    throw new Error("Analysis contains missing or unexpected fields");
  }

  if (!Number.isInteger(data.score) || data.score < 0 || data.score > 100) {
    throw new Error("Score must be an integer between 0 and 100");
  }

  for (const field of feedbackFields) {
    if (
      !Array.isArray(data[field]) ||
      data[field].some(
        (item) => typeof item !== "string" || !item.trim(),
      )
    ) {
      throw new Error(`${field} must contain nonempty strings`);
    }
  }

  return data;
}

module.exports = parseAnalysisResponse;
