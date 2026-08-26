import api from "../auth/apiClient";
import { getCurrentUserName } from "../auth/tokenStorage";

export const fetchCurrentUser = async () => {
    try {
        // The server resolves the user from the JWT, so no username is sent.
        const response = await api.get('/api/user/me');
        return response.data;
    } catch (error) {
        console.error("Error in fetchCurrentUser:", error);
        throw error;
    }
};
export const updateUser = async (userName, data) => {
    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("contact", data.contact);
    formData.append("location", data.location);
    formData.append("userType", data.userType);

    if (data.password) {
        formData.append("password", data.password);
    }

    if (data.profilePicFile) {
        formData.append("profilePic", data.profilePicFile);
    }

    try {
        const response = await api.put("/api/user/update", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw new Error(error.response?.data?.message || "Failed to update user");
    }
};

export const deleteUser = async () => {
    const username = getCurrentUserName();

    try {
        const response = await api.delete(`/api/user/delete/${username}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to delete account");
    }
};
