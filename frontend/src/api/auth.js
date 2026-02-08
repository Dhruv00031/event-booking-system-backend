import api from "./axios";

export const loginUser = async (credentials) => {
  const response = await api.post("/users/login/", credentials);
  return response.data;
};
