import apiClient, { getAuthHeaders } from "./client";

export const getProfile = async () => {
  const res = await apiClient.get("/api/user/profile", getAuthHeaders());
  return res.data;
};
