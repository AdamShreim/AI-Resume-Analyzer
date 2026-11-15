const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: Number,
    keywords_present: [String],
    keywords_missing: [String],
    strengths: [String],
    weaknesses: [String],
    suggestions: [String],
    resume_text: {
      type: String,
      required: true,
    },
    improved_resume: {
      type: String,
      default: null,
    },
    jobDescription: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Analysis", analysisSchema);
