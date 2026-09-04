// src/services/MyEnrollmentService.js
import api from '../auth/apiClient';
import { getCurrentUserName } from '../auth/tokenStorage';

/**
 * The logged-in student's classes, split into the ones a teacher has approved
 * and the requests still waiting for an answer.
 */
export const getMyEnrollments = async () => {
  const username = getCurrentUserName();
  if (!username) {
    throw new Error('User not logged in');
  }

  const response = await api.get(`/api/user/getEnrollments/${username}`);
  return response.data;
};
