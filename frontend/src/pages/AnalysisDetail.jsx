import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AnalysisDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/analysis/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResult(res.data);
      } catch (error) {
        console.error("Failed to load analysis details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAnalysis();
    }
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this analysis?",
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/analysis/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete analysis:", error);
      alert("Failed to delete analysis");
    }
  };

  return (
    <div className="home-page relative">
      <div className="w-[90%] lg:w-[60%] mx-auto mt-12 bg-white rounded-xl shadow-lg p-8 mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Analysis Results</h2>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400"
          >
            Delete
          </button>
        </div>

        {loading && <p>Loading analysis...</p>}

        {!loading && !result && <p>No analysis found.</p>}

        {result && (
          <div className="rounded mb-4">
            <h2 className="text-xl font-bold mb-4">
              Score: {result?.score ?? "N/A"}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-5">
              <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                <h3 className="text-xl font-bold mb-2">Strengths:</h3>
                <ul className="list-disc ml-5">
                  {result?.strengths?.length ? (
                    result.strengths.map((s, index) => (
                      <li key={index} className="text-green-600">
                        <span className="text-black">{s}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No data</li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                <h3 className="font-bold mb-2 text-xl">Weaknesses:</h3>
                <ul className="list-disc ml-5">
                  {result?.weaknesses?.length ? (
                    result.weaknesses.map((w, index) => (
                      <li key={index} className="text-red-600">
                        <span className="text-black">{w}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No data</li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                <h3 className="font-bold mb-2 text-xl">Keywords Present:</h3>
                <ul className="list-disc ml-5">
                  {result?.keywords_present?.length ? (
                    result.keywords_present.map((k, i) => (
                      <li key={i} className="text-green-600">
                        <span className="text-black">{k}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No data</li>
                  )}
                </ul>
              </div>

              <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                <h3 className="font-bold mb-2 text-xl">Keywords Missing:</h3>
                <ul className="list-disc ml-5">
                  {result?.keywords_missing?.length ? (
                    result.keywords_missing.map((k, i) => (
                      <li key={i} className="text-red-600">
                        <span className="text-black">{k}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-500">No data</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
              <h3 className="font-bold mb-2 text-xl">Suggestions:</h3>
              <ul className="list-disc ml-5">
                {result?.suggestions?.length ? (
                  result.suggestions.map((s, index) => (
                    <li key={index} className="text-green-600">
                      <span className="text-black">{s}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No data</li>
                )}
              </ul>
            </div>

            {result?.improved_resume && (
              <div className="bg-gray-100 rounded-xl p-8 shadow-md mb-8">
                <h3 className="font-bold mb-2 text-xl">Improved Resume:</h3>
                <pre className="whitespace-pre-wrap text-sm text-gray-700">
                  {result.improved_resume}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
