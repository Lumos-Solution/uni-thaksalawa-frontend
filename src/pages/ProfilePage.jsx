import { useState, useRef, useEffect } from "react";
import { FiEdit, FiLogOut, FiSettings, FiSun, FiUserX } from "react-icons/fi";
import { fetchCurrentUser } from "../service/userService"; // Make sure this path is correct

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
        profilePic: ""
    });

    const [passwordError, setPasswordError] = useState("");
    const [showPhotoMenu, setShowPhotoMenu] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const data = await fetchCurrentUser();
                setFormData({
                    ...data,
                    password: "",
                    confirmPassword: "",
                });
            } catch (error) {
                console.error("Failed to load user data.");
            }
        };
        getUser();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === "password" || e.target.name === "confirmPassword") {
            setPasswordError("");
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePic: reader.result });
            };
            reader.readAsDataURL(file);
        }
        setShowPhotoMenu(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        alert("Data Submitted!");
        console.log(formData); // Replace with API call
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

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div className="flex-1 p-10 space-y-10">
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="bg-white rounded-xl shadow p-6 flex items-center gap-6 relative">
                        <img
                            src={`http://localhost:3000/uploads/profilePics/${formData.profilePic}`}
                            alt="profile"
                            className="w-24 h-24 rounded-full object-cover border-4 border-blue-600 shadow-md cursor-pointer"
                            onClick={onProfilePicClick}
                        />
                        {showPhotoMenu && (
                            <div className="absolute top-28 left-28 bg-white shadow-lg rounded-md border border-gray-300 z-10 w-40">
                                <button type="button" onClick={onViewPhoto} className="w-full text-left px-4 py-2 hover:bg-blue-100">
                                    View Photo
                                </button>
                                <button type="button" onClick={onChangePhoto} className="w-full text-left px-4 py-2 hover:bg-blue-100">
                                    Change Photo
                                </button>
                            </div>
                        )}
                        <div>
                            <h1 className="text-xl font-bold">Hi {formData.name}, welcome to your profile!</h1>
                            <h3 className="text-gray-400">Manage your account details and preferences here</h3>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 space-y-6">
                        <h3 className="text-lg font-bold">Edit Profile</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium">Name</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Email</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Contact</label>
                                <input type="text" name="contact" value={formData.contact} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Location</label>
                                <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">User Type</label>
                                <select name="type" value={formData.type} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md">
                                    <option value="">Select type</option>
                                    <option value="undergraduate">Undergraduate</option>
                                    <option value="graduate">Graduate</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium">New Password</label>
                                <input type="password" name="password" value={formData.password} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Enter new password" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Confirm New Password</label>
                                <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="mt-1 w-full px-3 py-2 border rounded-md" placeholder="Confirm new password" />
                            </div>
                        </div>
                        <div className="pt-4">
                            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                                Save Changes
                            </button>
                        </div>
                        {passwordError && <p className="text-red-600 mt-2">{passwordError}</p>}
                    </div>

                    <div className="bg-white rounded-xl shadow p-6 space-y-6">
                        <h3 className="text-lg font-bold">Theme Settings</h3>
                        <p className="text-gray-600">Theme customization will be available soon...</p>
                    </div>
                </form>

                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <p className="mb-4 text-gray-700 text-lg">When you're ready, you can safely log out of your account here.</p>
                    <button
                        onClick={onLogout}
                        type="button"
                        className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md text-white bg-red-600 hover:bg-red-700"
                    >
                        <FiLogOut className="w-6 h-6" />
                        Logout
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow p-6 text-center">
                    <h3 className="text-lg font-bold text-red-600 mb-4">Delete Account</h3>
                    <p className="text-gray-700 mb-4">Permanently delete your account and all associated data. This action cannot be undone.</p>
                    <button
                        type="button"
                        onClick={() => {
                            if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
                                alert("Account deleted (simulate API call).");
                                onLogout(); // Log out the user
                            }
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 text-lg font-semibold rounded-md text-white bg-red-700 hover:bg-red-800"
                    >
                        <FiUserX className="w-6 h-6" />
                        Delete Account
                    </button>
                </div>
            </div>

            {showViewModal && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-20" onClick={closeModal}>
                    <div className="bg-white rounded-lg overflow-hidden max-w-md max-h-full p-4 relative">
                        <button className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl" onClick={closeModal}>
                            &times;
                        </button>
                        <img src={`http://localhost:3000/uploads/profilePics/${formData.profilePic}` } alt="Profile Full View" className="max-w-full max-h-[80vh] object-contain rounded-md" />
                    </div>
                </div>
            )}
        </div>
    );
}
