import api from "../auth/apiClient";

export const fetchClasses = async () => {
  const response = await api.get("/api/class/getAll");
  return response.data;
};
