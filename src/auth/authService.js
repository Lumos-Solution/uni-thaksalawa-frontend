import axios from 'axios';
import api, { API_BASE_URL } from './apiClient';
import { clearSession, saveSession } from './tokenStorage';

/** Signs in and stores the returned JWT pair. Returns the user summary from the server. */
export const signIn = async (credentials) => {
    // Uses bare axios: there is no token to attach yet.
    const { data } = await axios.post(`${API_BASE_URL}/api/user/signin`, credentials);
    saveSession(data);
    return data.user;
};

export const signUp = async (formData) => {
    const { data } = await axios.post(`${API_BASE_URL}/api/user/signup`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
};

export const signOut = () => clearSession();

/** Fetches the signed-in user straight from the token, no username guessing needed. */
export const fetchMe = async () => {
    const { data } = await api.get('/api/user/me');
    return data;
};
