import api from "./api";

export const signup = async (data) => {
  const response = await api.post("/api/signup/", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/api/login/", data);
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/api/profile/");
  return response.data;
};