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
    const username = localStorage.getItem("username");

    const response = await fetch(`http://localhost:3000/api/user/delete/${username}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error("Failed to delete account");
    }
    return response.json();
};