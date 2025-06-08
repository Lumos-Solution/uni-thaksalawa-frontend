import { classes } from './mockData';
import axios from "axios";
const api = axios.create({baseURL:"http://localhost:3000/api"});
// Function to get all classes
export const getAllClasses = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(classes);
    }, 1000); // Simulate API delay
  });
};

export const fetchClasses = async () => {
  const response = await api.get(`/classes/getAll`);
  return response.data;
};
