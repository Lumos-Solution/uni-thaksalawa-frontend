import api from '../auth/apiClient';
import { getCurrentUserName } from '../auth/tokenStorage';

export const fetchNotifications = async () => {
  const username = getCurrentUserName();
  if (!username) {
    throw new Error('User not logged in');
  }
  const response = await api.get(`/api/user/getRequests/${username}`);
  return response.data;
};

export const transferStudent = async (userName, classId) => {
  const response = await api.put('/api/userClassDetails/update', {
    userName,
    classId
  });
  return response.data;
};

export const deleteNotification = async (userName, classId) => {
  const response = await api.delete('/api/userClassDetails/delete', {
    data: { userName, classId }
  });
  return response.data;
};
