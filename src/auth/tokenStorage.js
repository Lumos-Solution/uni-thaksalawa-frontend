/*
 * Single place that knows where the JWTs live, so no component reaches into
 * localStorage for them directly.
 */
const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const saveSession = ({ accessToken, refreshToken, user }) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem('isLoggedIn', 'true');

    if (user?.userName) {
        localStorage.setItem('username', user.userName);
    }
    if (user?.profilePic) {
        localStorage.setItem('profilePic', user.profilePic);
    }
};

export const clearSession = () => {
    [ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, 'isLoggedIn', 'username', 'profilePic']
        .forEach((key) => localStorage.removeItem(key));
};

/** Reads the payload of a JWT without verifying it - only for expiry checks in the UI. */
const decodePayload = (token) => {
    try {
        const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
};

/**
 * True when a usable session exists. The refresh token is what really decides
 * this: an expired access token can still be exchanged for a new one.
 */
export const hasValidSession = () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
        return false;
    }

    const payload = decodePayload(refreshToken);
    return !payload?.exp || payload.exp * 1000 > Date.now();
};

export const getCurrentUserName = () => localStorage.getItem('username');
