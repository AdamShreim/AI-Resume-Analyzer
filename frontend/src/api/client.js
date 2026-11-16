import axios from "axios";

const apiClient = axios.create();

export const getAuthHeaders = (config = {}) => {
  const token = localStorage.getItem("token");
  const headers = { ...(config.headers || {}) };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return {
    ...config,
    headers,
  };
};

export default apiClient;
