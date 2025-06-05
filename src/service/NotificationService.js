import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export const fetchNotifications = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
        throw new Error('User not logged in');
    }
    const response = await api.get(`/api/user/getRequests/${username}`);
    return response.data;
};

// ✅ Update this function to use the correct URL
export const transferStudent = async (studentUsername, classId) => {
    const response = await api.put('/api/userClassDetails/update', {
        studentUsername,
        classId
    });
    return response.data;
};
