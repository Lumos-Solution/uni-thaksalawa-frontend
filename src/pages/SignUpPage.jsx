import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

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

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      const res = await axios.post('http://localhost:3000/api/user/signup', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.message === 'success') {
        Swal.fire('Success', 'Registration Successful!', 'success');
        navigate('/login');
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
      <div className="flex max-w-4xl w-full bg-white rounded shadow-md overflow-hidden">
        {/* Left-side image (only on medium+ screens) */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/signup.jpg"
            alt="Signup Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Signup form */}
        <form
          onSubmit={handleSubmit}
          className="w-full md:w-1/2 p-6"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

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

          <select
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
            required
          >
            <option value="">Select Location</option>
            {[
              'Ampara', 'Anuradhapura', 'Badulla', 'Batticaloa', 'Colombo',
              'Galle', 'Gampaha', 'Hambantota', 'Jaffna', 'Kalutara',
              'Kandy', 'Kegalle', 'Kilinochchi', 'Kurunegala', 'Mannar',
              'Matale', 'Matara', 'Monaragala', 'Mullaitivu', 'Nuwara Eliya',
              'Polonnaruwa', 'Puttalam', 'Ratnapura', 'Trincomalee', 'Vavuniya'
            ].map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>

          <select
            name="userType"
            value={form.userType}
            onChange={handleChange}
            className="w-full p-2 border mb-3 rounded"
            required
          >
            <option value="">Select User Type</option>
            <option value="afterAL">afterAL</option>
            <option value="undergraduate">Undergraduate</option>
            <option value="postgraduate">Postgraduate</option>
            <option value="other">Other</option>
          </select>

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

          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
