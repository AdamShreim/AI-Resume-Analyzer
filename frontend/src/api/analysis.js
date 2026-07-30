import apiClient, { getAuthHeaders } from "./client";

export const getAnalyses = async () => {
  const res = await apiClient.get("/api/analysis", getAuthHeaders());
  return res.data;
};
