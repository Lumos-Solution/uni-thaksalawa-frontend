import { mockClasses } from './mockData';
import axios from "axios";
const api = axios.create({baseURL:"http://localhost:3000/api"});
export const getAllClasses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockClasses);
    }, 1000); 
  });
};

export const fetchClasses = async () => {
  const response = await api.get(`/class/getAll`);
  return response.data;
};
