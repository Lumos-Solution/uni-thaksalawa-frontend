import axios from "axios";

const api = axios.create({baseURL: 'http://localhost:3000'});

export const fetchCurrentUser = async () => {
    const username = localStorage.getItem('username');
    if (!username) {
        throw new Error('User not logged in');
    }

    try {
        const response = await api.get(`/api/user/find/${username}`);
        console.log(response.data.profilePic);
        return response.data;
    } catch (error) {
        console.error("Error in fetchCurrentUser:", error);
        throw error;
    }
};
