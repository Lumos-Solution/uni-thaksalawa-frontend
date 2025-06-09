import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

const progressData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 35 },
  { name: 'Wed', value: 30 },
  { name: 'Thu', value: 25 },
  { name: 'Fri', value: 20 },
  { name: 'Sat', value: 15 },
  { name: 'Sun', value: 10 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const createClass = () => {
    navigate('/myClasses');
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 pt-20 pb-10 px-4 text-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="col-span-1 bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
            <h2 className="text-lg font-semibold text-blue-800 mb-3">Create a New Post</h2>
            <button
                onClick={createClass}
                className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium"
            >
              + Create Post
            </button>
          </div>

          <div className="bg-blue-100 text-blue-900 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <p className="text-sm font-medium">Classes</p>
            <p className="text-4xl font-bold mt-2">2</p>
          </div>

          <div className="bg-emerald-100 text-emerald-900 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <p className="text-sm font-medium">Enrollments</p>
            <p className="text-4xl font-bold mt-2">2</p>
          </div>

          <div className="bg-yellow-100 text-yellow-900 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <p className="text-sm font-medium">Courses</p>
            <p className="text-4xl font-bold mt-2">2</p>
          </div>

          <div className="bg-purple-100 text-purple-900 rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition">
            <p className="text-sm font-medium">Sessions</p>
            <p className="text-4xl font-bold mt-2">2</p>
          </div>

          <div className="col-span-1 md:col-span-2 bg-white rounded-2xl p-6 shadow-md border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📈 Weekly Progress</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={progressData}>
                <XAxis dataKey="name" stroke="#cbd5e1" />
                <YAxis stroke="#cbd5e1" />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="col-span-1 bg-gradient-to-tr from-blue-50 to-blue-100 text-blue-800 border border-dashed border-blue-300 rounded-2xl p-10 text-center text-xl font-medium shadow-sm hover:shadow-md transition">
            🔔 Upcoming
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
