iimport axios from 'axios';

// Create a reusable axios instance
const api = axios.create({ baseURL: 'http://localhost:3000' });

// Fetch notifications for the logged-in user
export const fetchNotifications = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
        throw new Error('User not logged in');
    }
    const response = await api.get(`/api/user/getRequests/${username}`);
    return response.data;
};

// Transfer student to a class
export const transferStudent = async (userName, classId) => {
    const response = await api.put('/api/userClassDetails/update', {
        userName,
        classId
    });
    return response.data;
};

// ✅ Delete a student-class request
export const deleteNotification = async (userName, classId) => {
    const response = await api.delete('/api/userClassDetails/delete', {
        data: { userName, classId } // body for DELETE request
    });
    return response.data;
};

