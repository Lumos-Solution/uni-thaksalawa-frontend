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

export const transferStudent = async (userName, classId) => {
    const response = await api.put('/api/userClassDetails/update', {
        userName,
        classId
    });
    return response.data;
};
