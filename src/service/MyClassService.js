// src/services/MyClassService.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/classes";

// Function to get enrolled classes for a given username
export const getEnrolledClassesByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/enrolled/${username}`);
    return response.data; // assuming this returns an array of classes
  } catch (error) {
    console.error("Failed to fetch enrolled classes:", error);
    throw error;
  }
};
