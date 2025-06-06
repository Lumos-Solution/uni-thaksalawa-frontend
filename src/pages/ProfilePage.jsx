import { useState, useRef, useEffect } from "react";
import { FiLogOut, FiUserX } from "react-icons/fi";
import { fetchCurrentUser, updateUser } from "../service/userService";

export default function ProfilePage({ onLogout }) {

        const [formData, setFormData] = useState({
            name: "",
            email: "",
            address: "",
            location: "",
            contact: "",
            password: "",
            confirmPassword: "",
            type: "",
            profilePic: "",
            profilePicFile: null, // ✅ Add this
            userName: "",

    });

    const [passwordError, setPasswordError] = useState("");
    const [showPhotoMenu, setShowPhotoMenu] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const data = await fetchCurrentUser();
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    address: data.address || "",
                    location: data.location || "",
                    contact: data.contact || "",
                    password: "",
                    confirmPassword: "",
                    type: data.type || "",
                    profilePic: data.profilePic || "",
                    userName: data.userName || "",
                });
            } catch (error) {
                console.error("Failed to load user data.", error);
                alert("Failed to load user data.");
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (name === "password" || name === "confirmPassword") {
            setPasswordError("");
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profilePic: URL.createObjectURL(file),
                profilePicFile: file, // ✅ Save the actual file here
            }));
        }
        setShowPhotoMenu(false);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            await updateUser(formData.userName, {
                name: formData.name,
                email: formData.email,
                contact: formData.contact,
                location: formData.location,
                userType: formData.type,
                password: formData.password ? formData.password : undefined,
                profilePicFile: formData.profilePicFile,
            });

            alert("Profile updated successfully");
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const onProfilePicClick = () => setShowPhotoMenu(!showPhotoMenu);
    const onViewPhoto = () => {
        setShowViewModal(true);
        setShowPhotoMenu(false);
    };
    const onChangePhoto = () => {
        fileInputRef.current?.click();
        setShowPhotoMenu(false);
    };
    const closeModal = () => setShowViewModal(false);

    const imageUrl =
        formData.profilePic?.startsWith("data:") ||
        formData.profilePic?.startsWith("blob:")
            ? formData.profilePic
            : `http://localhost:3000/uploads/profilePics/${formData.profilePic}`;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="flex-1 p-10 space-y-10">
                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 relative">
                        <img
                            src={imageUrl}
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 shadow-md cursor-pointer"
                            onClick={onProfilePicClick}
                        />
                        {showPhotoMenu && (
                            <div className="absolute top-28 left-28 bg-white shadow-lg rounded-md border border-gray-300 z-10 w-40">
                                <button
                                    type="button"
                                    onClick={onViewPhoto}
                                    className="w-full text-left px-4 py-2 hover:bg-blue-100"
                                >
                                    View Photo
                                </button>
                                <button
                                    type="button"
                                    onClick={onChangePhoto}
                                    className="w-full text-left px-4 py-2 hover:bg-blue-100"
                                >
                                    Change Photo
                                </button>
                            </div>
                        )}
                        <div>
                            <h1 className="text-xl font-bold">
                                Hi {formData.name ?? ""}, welcome to your profile!
                            </h1>
                            <h3 className="text-gray-400">
                                Manage your account details and preferences here
                            </h3>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    {/* Edit Form */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-6">
                        <h3 className="text-lg font-bold">Edit Profile</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {["name", "email", "contact", "location", "address"].map(
                                (field) => (
                                    <div key={field}>
                                        <label className="block text-sm font-medium capitalize">
                                            {field}
                                        </label>
                                        <input
                                            type={field === "email" ? "email" : "text"}
                                            name={field}
                                            value={formData[field] ?? ""}
                                            onChange={handleChange}
                                            className="mt-1 w-full px-3 py-2 border rounded-md"
                                        />
                                    </div>
                                )
                            )}
                            <div>
                                <label className="block text-sm font-medium">User Type</label>
                                <select
                                    name="type"
                                    value={formData.type ?? ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-3 py-2 border rounded-md"
                                >
                                    <option value="">Select type</option>
                                    <option value="undergraduate">Undergraduate</option>
                                    <option value="graduate">Graduate</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">New Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password ?? ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-3 py-2 border rounded-md"
                                    placeholder="Enter new password"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword ?? ""}
                                    onChange={handleChange}
                                    className="mt-1 w-full px-3 py-2 border rounded-md"
                                    placeholder="Confirm password"
                                />
                            </div>
                        </div>
                        {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>

                    {/* Theme Section */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-6">
                        <h3 className="text-lg font-bold">Theme Settings</h3>
                        <p className="text-gray-600">Theme customization will be available soon...</p>
                    </div>
                </form>

                {/* Logout Section */}
                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <p className="mb-4 text-gray-700 text-lg">
                        You can safely log out from here.
                    </p>
                    <button
                        onClick={onLogout}
                        className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        <FiLogOut className="w-6 h-6" /> Logout
                    </button>
                </div>

                {/* Delete Account Section */}
                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <h3 className="text-lg font-bold text-red-600 mb-4">Delete Account</h3>
                    <p className="text-gray-700 mb-4">
                        Permanently delete your account and all associated data. This action
                        cannot be undone.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            if (
                                window.confirm(
                                    "Are you sure you want to delete your account? This action cannot be undone."
                                )
                            ) {
                                alert("Account deleted (simulate API call).");
                                onLogout();
                            }
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md text-white bg-red-800 hover:bg-red-900"
                    >
                        <FiUserX className="w-6 h-6" /> Delete Account
                    </button>
                </div>

                {/* View Photo Modal */}
                {showViewModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                        <div className="bg-white rounded-lg p-4 max-w-lg w-full relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                            >
                                ✕
                            </button>
                            <img
                                src={imageUrl}
                                alt="profile enlarged"
                                className="rounded-lg max-h-[70vh] w-full object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
