import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export const fetchNotifications = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
        throw new Error('User not logged in');
    }
    const response = await api.get(`/api/user/getRequest/${username}`);
    return response.data;
};
