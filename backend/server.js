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

    const pdfData = await pdfParse(dataBuffer);
    const text = pdfData.text;
    const cleanedText = text.replace(/\s+/g, " ").trim();

    const aiResponse = await openai.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: "You are a strict professional resume reviewer.",
        },
        {
          role: "user",
          content: `You are an ATS (Applicant Tracking System) resume evaluator.

                  Analyze the following resume against a typical job market standard.

                  IMPORTANT:
                  - Return ONLY valid JSON
                  - No explanations outside JSON
                  - Be strict and realistic like a real ATS system

                  Evaluation criteria:
                  1. Keyword relevance (skills, technologies, roles)
                  2. Resume structure (sections like education, experience, skills)
                  3. Clarity and readability
                  4. Professional tone
                  5. Experience quality

                  Also:
                  - Identify important industry keywords that are MISSING
                  - Extract keywords that are PRESENT

                  Return JSON in this exact format:

                  {
                    "score": number (0-100),
                    "strengths": string[],
                    "weaknesses": string[],
                    "suggestions": string[],
                    "keywords_present": string[],
                    "keywords_missing": string[]
                  }

                  Resume:
                  ${text}
                  `,
        },
      ],
    });

    const result = aiResponse.choices[0].message.content;
    let parsed;
    try {
      const clean = result.replace(/```json|```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (e) {
      console.log("Failed to parse AI response as JSON:", e);
      return res.status(500).json({ error: "Failed to parse AI response" });

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

    fs.unlinkSync(filePath); // Clean up the uploaded file
    res.json(parsed);
  } catch (err) {
    console.error("PDF parsing error:", err);
    res.status(500).json({ error: "Failed to analyze file" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
