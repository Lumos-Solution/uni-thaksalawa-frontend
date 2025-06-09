import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, Link } from 'react-router-dom';

function Signin({setIsLoggedIn}) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ userName: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/user/signin', form);
      console.log("send");
      console.log(res);
      if (res.data.message === 'success') {
        localStorage.setItem('username', form.userName);
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn("true");
        navigate('/dashboard');
      } else {
        Swal.fire('Oops', 'Invalid username or password', 'error');
      }
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Server Error', 'error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
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
  );
}

export default Signin;
