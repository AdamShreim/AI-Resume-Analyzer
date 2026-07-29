import { Link, useNavigate } from "react-router-dom";
import { getProfile } from "../api/profile";
import { getAnalyses } from "../api/analysis";
import AnalysisCard from "../components/AnalysisCard";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [analyses, setAnalyses] = useState([]);
  const [loadingAnalyses, setLoadingAnalyses] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setUser(data.user);
      } catch (err) {
        console.error(
          "ERROR fetching user:",
          err.response?.data || err.message,
        );
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    const fetchAnalyses = async () => {
      try {
        setLoadingAnalyses(true);
        const data = await getAnalyses();
        setAnalyses(data);
      } catch (err) {
        console.error("Failed to fetch analyses:", err);
      } finally {
        setLoadingAnalyses(false);
      }
    };

    // Run both
    fetchUser();
    fetchAnalyses();
  }, [navigate]);

  return (
    <div className="home-page min-h-screen relative ">
      <div>
        <h1>Dashboard</h1>
        {user ? <p>Welcome {user.email}</p> : <p>Loading...</p>}
      </div>
      <div>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
      <div className="w-[90%] lg:w-[70%] mx-auto py-10 relative bg-white rounded-2xl my-10 shadow-2xl p-8">
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
            {loadingAnalyses ? (
              <p>Loading analyses...</p>
            ) : (
              analyses.map((analysis) => (
                <AnalysisCard
                  key={analysis._id}
                  analysis={analysis}
                  onClick={() => navigate(`/analysis/${analysis._id}`)}
                  onDelete={(deletedId) => {
                    setAnalyses((prev) =>
                      prev.filter((item) => item._id !== deletedId),
                    );
                  }}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
