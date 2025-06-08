// src/services/MyClassService.js
import axios from 'axios';

const api = axios.create({baseURL:"http://localhost:3000/api"});

export const getEnrolledClassesByUsername = async (username) => {
  try {
    const response = await api.get(`user/getEnrollments/${username}`);
    return response.data; // should be an array of class objects
  } catch (error) {
    console.error('Error fetching enrolled classes:', error);
    throw error;
  }
};
