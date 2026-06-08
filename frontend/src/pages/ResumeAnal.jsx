import { useState } from "react";

export default function ResumeAnal() {
  const [showResults, setShowResults] = useState(false);
  const [file, setFile] = useState(null);
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
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-[90%] lg:w-[60%] h-125 border-2 border-dashed border-gray-400 mx-auto bg-gray-200 rounded-xl p-6 shadow-lg relative items-center justify-center flex flex-col gap-4 hover:border-black transition-colors duration-300"
      >
        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          id="resume-upload"
          className="hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
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

      <div className="items-center justify-center flex">
        <button
          onClick={() => setShowResults(true)}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-400 mt-6 shadow-lg transition"
        >
          Analyze Resume
        </button>
      </div>
      {showResults && (
        <div className="w-[90%] lg:w-[60%] mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold mb-4">Analysis Results</h2>

          <p className="text-lg mb-4">
            ATS Score: <span className="font-bold text-green-600">89/100</span>
          </p>

          <h3 className="font-bold mb-2">Strengths</h3>
          <ul className="mb-6">
            <li>✓ React</li>
            <li>✓ Python</li>
            <li>✓ Machine Learning</li>
          </ul>

          <h3 className="font-bold mb-2">Suggestions</h3>
          <ul>
            <li>• Add more project details</li>
            <li>• Improve summary section</li>
            <li>• Include more ATS keywords</li>
          </ul>
        </div>
      )}
    </div>
  );
}
