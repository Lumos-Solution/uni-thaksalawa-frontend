import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [passwordStrength, setPasswordStrength] = useState('');

  // 💡 Check password strength
  const evaluatePassword = (password) => {
    if (password.length < 6) return 'Weak';
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/\d/) && password.length >= 8) {
      return 'Strong';
    }
    return 'Medium';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      setPasswordStrength(evaluatePassword(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/signup', formData);

      if (response.data.success) {
        Swal.fire('Success!', 'Signup successful', 'success');
        navigate('/login');
      } else {
        Swal.fire('Oops!', response.data.message || 'Signup failed', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong during signup', 'error');
    }
  };

  // 🎨 Color based on strength
  const getStrengthColor = () => {
    if (passwordStrength === 'Strong') return 'text-green-600';
    if (passwordStrength === 'Medium') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
          {/* Password strength display */}
          {formData.password && (
            <p className={`text-sm font-semibold ${getStrengthColor()}`}>
              Strength: {passwordStrength}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
