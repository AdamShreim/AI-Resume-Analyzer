import axios from "axios";

export const getAnalyses = async () => {
  const token = localStorage.getItem("token");
  const res = await axios.get("/api/analysis", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
