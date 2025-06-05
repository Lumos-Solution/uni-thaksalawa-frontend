import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3000' });

export const fetchNotifications = async () => {
    const response = await api.get('/api/user/getRequest/&username'); // Replace &username with real value
    return response.data;
};
