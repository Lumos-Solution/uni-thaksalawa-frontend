import api from '../auth/apiClient';
import { getCurrentUserName } from '../auth/tokenStorage';

/** Join requests waiting for the logged-in teacher to answer. */
export const fetchNotifications = async () => {
  const username = getCurrentUserName();
  if (!username) {
    throw new Error('User not logged in');
  }
  const response = await api.get(`/api/user/getRequests/${username}`);
  return response.data;
};

export const approveRequest = async (userName, classId) => {
  const response = await api.put('/api/userClassDetails/approve', { userName, classId });
  return response.data;
};

export const declineRequest = async (userName, classId) => {
  const response = await api.delete('/api/userClassDetails/decline', {
    data: { userName, classId },
  });
  return response.data;
};
