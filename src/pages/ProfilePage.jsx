import { useState } from "react";

export default function ProfilePage() {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        address: '',
        profilePic: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Data Submitted!');
        console.log(formData);
    };

    return (
        <div className="min-h-screen bg-white text-blue-800 font-sans">
            {/* Header */}
            <header className="flex justify-between items-center px-6 py-4 bg-blue-600 text-white shadow-md">
                <div className="text-xl font-bold">Uniක්සලාව</div>
                <nav className="space-x-4 hidden sm:block">
                    <a href="#" className="hover:underline">Home</a>
                    <a href="#" className="hover:underline">About</a>
                    <a href="#" className="hover:underline">Subjects</a>
                    <a href="#" className="hover:underline">Contact</a>
                </nav>
                <div className="space-x-2">
                    <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100">Log In</button>
                    <button className="bg-white text-blue-600 px-4 py-1 rounded hover:bg-blue-100">Sign Up</button>
                    <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Logout</button>
                </div>
            </header>

            {/* Main */}
            <main className="p-6 max-w-4xl mx-auto">
                <div className="flex flex-col items-center text-center mb-8">
                    <img
                        src={formData.profilePic || "https://randomuser.me/api/portraits/men/75.jpg"}
                        alt="student"
                        className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-500"
                    />
                    <h1 className="text-2xl font-semibold">
                        <span className="text-blue-600">Welcome</span> dear <span className="text-black font-bold">{formData.name || 'student name'}</span>
                    </h1>
                    <p className="text-gray-500">You can edit your data below</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 bg-blue-50 p-6 rounded-xl shadow-lg">
                    <div>
                        <label className="block font-medium mb-1">Profile Picture</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="block w-full" />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Value"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Surname</label>
                        <input
                            type="text"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            placeholder="Value"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Value"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Permanent Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Value"
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-400"
                        />
                    </div>

                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Submit
                    </button>
                </form>
            </main>
        </div>
    );
}
