import { useState } from "react";
import { useMemo } from "react";
import axios from "axios";

export default function ResumeAnal() {
  const [result, setResult] = useState(null);
  //.........................................................
  const handleAnalysis = async () => {
    console.log("Button clicked");
    if(!file) return;
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const res = await axios.post("/api/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log(res.data);
      setResult(res.data);
    } catch (error) {
      console.error("Error occurred while analyzing resume:", error);
    }
  };
  //........................................................
  const score = 99;
  const [showResults, setShowResults] = useState(false);
  const [file, setFile] = useState(null);
  {
    /* TODO: Replace with createObjectURL cleanup using useEffect*/
  }
  const fileUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFile = e.dataTransfer.files[0];

    if (droppedFile) {
      setFile(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const getRating = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs Improvements";
  };

  return (
    <div className="home-page min-h-screen relative">
      <div className="w-[90%] lg:w-[60%] mx-auto relative mt-10">
        <h1 className="text-4xl font-bold mb-4">Resume Analysis</h1>
        <p className="text-gray-800 text-lg mb-6">
          Upload your resume and receive detailed feedback, ATS optimization
          suggestions, and skill analysis.
        </p>
      </div>
      {/* upload card*/}
      <input
        type="file"
        accept=".pdf,.png,.jpg,.jpeg"
        id="resume-upload"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
      {file ? (
        <div className="flex flex-col items-center gap-3">
          <p className="font-semibold text-xl">Selected File</p>

          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {file.name}
          </a>

          <p className="text-gray-500 text-sm">
            {(file.size / 1024).toFixed(1)} KB
          </p>

          <div className="flex gap-3 mt-4">
            <button
              onClick={() => {
                setFile(null);
                setShowResults(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
            >
              Remove File
            </button>

            <label
              htmlFor="resume-upload"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 cursor-pointer"
            >
              Choose Another
            </label>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-[90%] lg:w-[60%] h-125 border-2 border-dashed border-gray-400 mx-auto bg-gray-200 rounded-xl p-6 shadow-lg relative items-center justify-center flex flex-col gap-4 hover:border-black transition-colors duration-300"
        >
          <p className="text-gray-600">
            Drag and drop your resume here, or click to browse files.
          </p>
          <label
            htmlFor="resume-upload"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 shadow-lg transition cursor-pointer"
          >
            Browse Files
          </label>
          {file && (
            <p className="text-green-600 font-medium">
              Selected File: {file.name}
            </p>
          )}
        </div>
      )}

      <div className="items-center justify-center flex">
        <button
          onClick={async() => {
            if (!file) return;
            await handleAnalysis();
            setShowResults(true);
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 mt-6 shadow-lg transition"
        >
          Analyze Resume
        </button>
      </div>

      {/*Results section */}
      {showResults && (
        <div className="w-[90%] lg:w-[60%] mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 mb-12">
          {result && (
            <div className="bg-blue-100 p-4 rounded mb-4">
              <p>{result.score}</p>
              <p>{result.feedback}</p>
              <pre>{result.text}</pre>
            </div>
          )}
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          {/*ATS card */}
          <div className="bg-gray-100 rounded-xl p-8 text-center shadow-md mb-8">
            <h3 className="text-xl font-bold mb-3">ATS Score</h3>

            <p className="text-5xl font-bold text-green-600">{score}</p>

            <p className="text-gray-500 mt-2">out of 100</p>

            <p className="font-medium mt-4 text-green-600">
              {getRating(score)}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
            {/* strength card */}
            <div className="bg-gray-100 rounded-xl p-8 text-center shadow-md mb-8">
              <h3 className="text-xl font-bold mb-2">Strengths</h3>
              <ul className="mb-6 space-y-3">
                <li>
                  <span className="text-green-600">✓</span> React
                </li>
                <li>
                  <span className="text-green-500">✓</span> Python
                </li>
                <li>
                  <span className="text-green-500">✓</span> Machine Learning
                </li>
              </ul>
            </div>

            {/*Suggestion card*/}
            <div className="bg-gray-100 rounded-xl p-8 text-center shadow-md mb-8">
              <h3 className="font-bold mb-2 text-xl">Suggestions</h3>
              <ul className="mb-6 space-y-3">
                <li>• Add more project details</li>
                <li>• Improve summary section</li>
                <li>• Include more ATS keywords</li>
              </ul>
            </div>
          </div>

          {/* Missing Keyword card*/}
          <div className="bg-gray-100 rounded-xl p-8 text-center shadow-md mb-8">
            <h3 className="font-bold text-xl mb-2">Missing Keywords</h3>
            <div className="flex flex-wrap gap-3 justify-center">
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                Git
              </span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                Docker
              </span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                SQL
              </span>
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full">
                REST APIs
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
