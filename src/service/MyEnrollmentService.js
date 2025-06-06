// src/services/MyClassService.js
import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/classes';

export const getEnrolledClassesByUsername = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/getClasses/${username}`);
    return response.data; // should be an array of class objects
  } catch (error) {
    console.error('Error fetching enrolled classes:', error);
    throw error;
  }
};
