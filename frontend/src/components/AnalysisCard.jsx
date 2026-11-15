import axios from "axios";

export default function AnalysisCard({ analysis, onClick, onDelete }) {
  const date = analysis.createdAt
    ? new Date(analysis.createdAt).toLocaleDateString()
    : "Unknown date";

  const title = analysis.jobDescription
    ? analysis.jobDescription.length > 60
      ? analysis.jobDescription.slice(0, 57) + "..."
      : analysis.jobDescription
    : `Analysis ${analysis._id?.slice(-6) || "#"}`;

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this analysis?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/analysis/${analysis._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onDelete?.(analysis._id);
    } catch (error) {
      console.error("Failed to delete analysis:", error);
      alert("Failed to delete analysis");
    }
  };

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="group relative bg-gray-100 border-gray-400 border-2 rounded-lg shadow-xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
    >
      <button
        onClick={handleDelete}
        className="absolute top-3 right-3 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-400"
        aria-label="Delete analysis"
      >
        ×
      </button>

      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-green-600 text-2xl font-semibold">
        Score: {analysis.score ?? "N/A"}/100
      </p>
      <p className="text-gray-400 mt-2">{date}</p>
    </div>
  );
}
