import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: '',
    password: '',
    name: '',
    email: '',
    contact: '',
    location: '',
    userType: '',
    profilePic: null
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, profilePic: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData for file upload
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await axios.post('http://localhost:3000/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.success) {
        Swal.fire('Success', 'Registration Successful!', 'success');
        navigate('/signin');
      } else {
        Swal.fire('Error', 'Registration failed!', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Server Error!', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        {/* Text fields */}
        <input
          type="text"
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={form.contact}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        {/* Location dropdown */}
        <select
          name="location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        >
          <option value="">Select Location</option>
          <option>Ampara</option>
          <option>Anuradhapura</option>
          <option>Badulla</option>
          <option>Batticaloa</option>
          <option>Colombo</option>
          <option>Galle</option>
          <option>Gampaha</option>
          <option>Hambantota</option>
          <option>Jaffna</option>
          <option>Kalutara</option>
          <option>Kandy</option>
          <option>Kegalle</option>
          <option>Kilinochchi</option>
          <option>Kurunegala</option>
          <option>Mannar</option>
          <option>Matale</option>
          <option>Matara</option>
          <option>Monaragala</option>
          <option>Mullaitivu</option>
          <option>Nuwara Eliya</option>
          <option>Polonnaruwa</option>
          <option>Puttalam</option>
          <option>Ratnapura</option>
          <option>Trincomalee</option>
          <option>Vavuniya</option>
        </select>

        {/* User type dropdown */}
        <select
          name="userType"
          value={form.userType}
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        >
          <option value="">Select User Type</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>

        {/* Profile picture upload */}
        <input
          type="file"
          accept="image/*"
          name="profilePic"
          onChange={handleFileChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Signup;
