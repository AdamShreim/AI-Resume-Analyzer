const multer = require("multer");
const fs = require("fs");
const express = require("express");

const pdfParse = require("pdf-parse");
// console.log("FULL MODULE:", pdfParseModule);
// console.log("TYPE:", typeof pdfParseModule);
// console.log(pdfParse);

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

    fs.unlinkSync(filePath); // Clean up the uploaded file
    res.json({
      score: 66,
      feedback: "do better next time",
      text,
    });
  } catch (err) {
    console.error("PDF parsing error:", err);
    res.status(500).json({ error: "Failed to analyze file" });
  }
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
