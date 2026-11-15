import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

export default function ResumeAnal() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [improvedResume, setImprovedResume] = useState("");
  const [isImproving, setIsImproving] = useState(false);

  const [analysisId, setAnalysisId] = useState(null);
  //.........................................................
  //api request to backend for analysis
  const handleAnalysis = async () => {
    if (!file) return;
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);
      const res = await axios.post("/api/ai/analyze", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setAnalysisId(res.data._id);
      setResult(res.data); // Store the analysis results for display
      setShowResults(true);
    } catch (error) {
      console.error("Error occurred while analyzing resume:", error);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };
  //........................................................

  const handleImprove = async () => {
    if (!analysisId) {
      console.error("Cannot improve without analysis ID");
      return;
    }

    try {
      setIsImproving(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/ai/improve",
        {
          analysisId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setImprovedResume(res.data.improved);
    } catch (error) {
      console.error("Error occurred while improving resume:", error);
    } finally {
      setIsImproving(false);
    }
  };

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);
  //file handling functions
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (!droppedFile || droppedFile.type !== "application/pdf") return;
    handleFileChange(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = (newFile) => {
    if (!newFile || newFile.type !== "application/pdf") return;

    // cleanup old URL
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    const url = URL.createObjectURL(newFile);

    setFile(newFile);
    setFileUrl(url);
  };

  const handleRemoveFile = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    setFile(null);
    setFileUrl(null);
    setShowResults(false);
  };
  //end of file handling functions
  //........................................................
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
        accept=".pdf"
        id="resume-upload"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files[0])}
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
              onClick={handleRemoveFile}
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
        <div className="flex flex-col items-center gap-3">
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
        </div>
      )}
      {/* Job description input */}
      <textarea
        placeholder="Enter job description..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="p-2 border rounded mb-4 w-[90%] lg:w-[30%] flex items-center justify-center mx-auto mt-6"
      />

      <div className="items-center justify-center flex">
        <button
          onClick={async () => {
            if (!file) return;
            await handleAnalysis();
            setShowResults(true);
          }}
          disabled={loading}
          style={{
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 mt-6 shadow-lg transition"
        >
          {loading
            ? loading && <div className="spinner"></div>
            : "Analyze Resume"}
        </button>
      </div>

      {/*Results section */}

      {showResults && (
        <div className="w-[90%] lg:w-[60%] mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>
          {result && (
            <div className="flext rounded mb-4">
              <div className="">
                <h2 className="text-xl font-bold mb-4">
                  Score: {result?.score ?? "N/A"}
                </h2>
              </div>

              {/* Results Cards */}
              <div className="grid grid-cols-1  lg:grid-cols-2 lg:gap-5">
                {/* strength card */}
                <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                  <h3 className="text-xl font-bold mb-2">Strengths:</h3>
                  <ul className="list-disc ml-5">
                    {result?.strengths?.map((s, index) => (
                      <li key={index} className="text-green-600">
                        <span className="text-black">{s}</span>
                      </li>
                    )) || <p>No data</p>}
                  </ul>
                </div>

                {/*Weaknesses card*/}
                <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                  <h3 className="font-bold mb-2 text-xl">Weaknesses:</h3>
                  <ul className="list-disc ml-5">
                    {result?.weaknesses?.map((w, index) => (
                      <li key={index} className="text-red-600">
                        <span className="text-black">{w}</span>
                      </li>
                    )) || <p>No data</p>}
                  </ul>
                </div>

                {/* Keywords Present and Missing card */}
                <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                  <h3 className="font-bold mb-2 text-xl">Keywords Present:</h3>
                  <ul className="list-disc ml-5">
                    {result?.keywords_present?.map((k, i) => (
                      <li key={i} className="text-green-600">
                        <span className="text-black">{k}</span>
                      </li>
                    )) || <p>No data</p>}
                  </ul>
                </div>
                <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                  <h3 className="font-bold mb-2 text-xl">Keywords Missing:</h3>
                  <ul className="list-disc ml-5">
                    {result?.keywords_missing?.map((k, i) => (
                      <li key={i} className="text-red-600">
                        <span className="text-black">{k}</span>
                      </li>
                    )) || <p>No data</p>}
                  </ul>
                </div>
              </div>

              {/* Suggestions card*/}
              <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                <h3 className="font-bold mb-2 text-xl">Suggestions:</h3>
                <ul className="list-disc ml-5">
                  {result?.suggestions?.map((s, index) => (
                    <li key={index} className="text-green-600">
                      <span className="text-black">{s}</span>
                    </li>
                  )) || <p>No data</p>}
                </ul>
              </div>
            </div>
          )}

          <button
            onClick={handleImprove}
            disabled={isImproving}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 mt-6 shadow-lg transition"
          >
            {isImproving ? "Improving..." : "Improve Resume"}
          </button>
          {improvedResume && (
            <div>
              <h3>Improved Resume</h3>

              <pre style={{ whiteSpace: "pre-wrap" }}>{improvedResume}</pre>
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-500 shadow-lg transition"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
