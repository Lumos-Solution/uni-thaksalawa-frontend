import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SignInPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ [START] TEMPORARY TEST LOGIN (REMOVE WHEN BACKEND IS READY)
    if (formData.email === 'test@test.com' && formData.password === '123') {
      setIsLoggedIn(true);  // ⬅️ Allow dashboard access
      localStorage.setItem("isLoggedIn", "true"); // Optional: persist across refresh
      Swal.fire('Success!', 'Test login successful (no backend used)', 'success');
      navigate('/dashboard');
      return;
    }
    // ✅ [END] TEMPORARY TEST LOGIN

    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);

      if (response.data.success) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        Swal.fire('Success!', 'Login successful', 'success');
        navigate('/dashboard');
      } else {
        Swal.fire('Oops!', response.data.message || 'Login failed', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error!', 'Something went wrong during login', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
