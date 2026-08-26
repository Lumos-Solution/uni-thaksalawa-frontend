// src/services/MyEnrollmentService.js
import api from '../auth/apiClient';

export const getEnrolledClassesByUsername = async (username) => {
  try {
    const response = await api.get(`/api/user/getEnrollments/${username}`);
    return response.data; // should be an array of class objects
  } catch (error) {
    console.error('Error fetching enrolled classes:', error);
    throw error;
  }
};
