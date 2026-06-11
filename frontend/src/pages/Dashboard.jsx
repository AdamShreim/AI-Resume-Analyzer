import { Link } from "react-router-dom";

export default function Dashboard() {
  const analyses = [
    { id: 1, file: "Resume_2026.pdf", score: 89, date: "09 Jun 2026" },
    { id: 2, file: "Frontend_Resume.pdf", score: 84, date: "06 Jun 2026" },
    { id: 3, file: "Internship_CV.pdf", score: 71, date: "01 Jun 2026" },
  ];
  return (
    <div className="home-page min-h-screen relative ">
      <div className="w-[90%] lg:w-[80%] mx-auto py-10 relative bg-white rounded-2xl my-10 shadow-2xl p-8">
        <div>
          <h1 className="font-bold text-4xl mb-4">Dashboard</h1>
          <p className="text-gray-600 text-xl mb-10">
            Manage your resume and track your progress
          </p>
          <hr className="border-0 h-0.5 bg-gray-500" />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 mt-10"> Analyze New Resume</h2>
          <p className="text-gray-600 mb-5">
            Upload a new resume and receive AI-powered feedback, ATS analysis,
            and recommendations.
          </p>
          <Link to="/resume-analysis">
            <button className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-500 transition ml-5 mb-10">
              Analyze Resume
            </button>
          </Link>
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-6">Recent Analyses</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analyses.map((analysis) => (
              <div
                key={analysis.id}
                className="bg-gray-100 border-gray-400 border-2 rounded-lg shadow-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
              >
                <h3 className="text-2xl font-bold mb-4">{analysis.file}</h3>
                <p className="text-green-600 text-2xl font-semibold">
                  score: {analysis.score}/100
                </p>
                <p className="text-gray-400">{analysis.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
