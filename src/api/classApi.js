import { mockClasses } from './mockData';
import api from "../auth/apiClient";

export const getAllClasses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClasses);
    }, 1000); 
  });
};

export const fetchClasses = async () => {
  const response = await api.get(`/api/class/getAll`);
  return response.data;
};
