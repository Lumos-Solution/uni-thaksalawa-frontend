// src/services/MyClassService.js
import axios from "axios";

const api = axios.create({baseURL:"http://localhost:3000/api"});

// Function to get my classes for a given username
export const getClassesByUsername = async (username) => {
  try {
    const response = await api.get(`/classes/getClasses/${username}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my classes:", error);
    throw error;
  }
};
//post