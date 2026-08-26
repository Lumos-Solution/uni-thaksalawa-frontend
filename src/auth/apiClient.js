import axios from 'axios';
import {
    clearSession,
    getAccessToken,
    getRefreshToken,
    saveSession,
} from './tokenStorage';

export const API_BASE_URL = 'http://localhost:3000';

/** The one axios instance every service should use, so auth is handled in a single place. */
const api = axios.create({ baseURL: API_BASE_URL });

// Requests that must not carry (or wait on) a token.
const PUBLIC_PATHS = ['/api/user/signin', '/api/user/signup', '/api/user/refresh'];
const isPublic = (url = '') => PUBLIC_PATHS.some((path) => url.includes(path));

api.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token && !isPublic(config.url)) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// While a refresh is in flight every other 401 waits on this same promise
// instead of firing its own refresh call.
let refreshInFlight = null;

const refreshSession = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        throw new Error('No refresh token');
    }

    const { data } = await axios.post(`${API_BASE_URL}/api/user/refresh`, { refreshToken });
    saveSession(data);
    return data.accessToken;
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const request = error.config;

        // Retry once, and only for an expired-token 401 on a protected call.
        if (
            error.response?.status !== 401 ||
            !request ||
            request._retried ||
            isPublic(request.url)
        ) {
            return Promise.reject(error);
        }

        request._retried = true;

        try {
            refreshInFlight = refreshInFlight || refreshSession().finally(() => {
                refreshInFlight = null;
            });
            const accessToken = await refreshInFlight;

            request.headers.Authorization = `Bearer ${accessToken}`;
            return api(request);
        } catch {
            // The refresh token is gone or expired too - the session is over.
            clearSession();
            if (window.location.pathname !== '/login') {
                window.location.assign('/login');
            }
            return Promise.reject(error);
        }
    }
);

export default api;
