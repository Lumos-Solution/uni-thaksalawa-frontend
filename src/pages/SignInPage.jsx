import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { signIn } from '../auth/authService';
import { useNavigate, Link } from 'react-router-dom';

function Signin({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Stores the JWT pair returned by the server; every later request is
      // authenticated with it.
      await signIn(form);
      setIsLoggedIn(true);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        Swal.fire('Oops', 'Invalid username or password', 'error');
      } else {
        Swal.fire('Error', 'Server Error', 'error');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex max-w-4xl w-full bg-white rounded shadow-md overflow-hidden">
        {}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/sigin.jpg"  
            alt="Signin Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {}
        <form onSubmit={handleSubmit} className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

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

          <button type="submit" className="bg-green-500 text-white w-full py-2 rounded hover:bg-green-600">
            Login
          </button>

          <p className="mt-4 text-center text-sm">
            Haven't an account?{' '}
            <Link to="/signUp" className="text-blue-600 hover:underline">
              Create new account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signin;