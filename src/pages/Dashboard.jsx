import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getClassesByUsername } from '../service/MyClassService';
import { getMyEnrollments } from '../service/MyEnrollmentService';
import {
  approveRequest,
  declineRequest,
  fetchNotifications,
} from '../service/NotificationService';
import { getCurrentUserName } from '../auth/tokenStorage';

const StatTile = ({ label, value, tone }) => (
  <div className={`${tone} rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition`}>
    <p className="text-sm font-medium">{label}</p>
    <p className="text-4xl font-bold mt-2">{value}</p>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const username = getCurrentUserName();

  const [taughtCount, setTaughtCount] = useState(0);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [awaitingCount, setAwaitingCount] = useState(0);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
   * Everything on this page is real: the classes this user teaches, the classes
   * they were approved into, and the requests waiting on their answer. A failing
   * call leaves its own figure at zero rather than blanking the whole page.
   */
  useEffect(() => {
    if (!username) return;

    const load = async () => {
      const [taught, enrollments, pending] = await Promise.allSettled([
        getClassesByUsername(username),
        getMyEnrollments(),
        fetchNotifications(),
      ]);

      if (taught.status === 'fulfilled') setTaughtCount(taught.value.length);
      if (enrollments.status === 'fulfilled') {
        setEnrolledCount(enrollments.value.approved.length);
        setAwaitingCount(enrollments.value.pending.length);
      }
      if (pending.status === 'fulfilled') setRequests(pending.value);

      setLoading(false);
    };

    load();
  }, [username]);

  const answer = async (action, note, successMessage) => {
    try {
      await action(note.request.userName, note.classInfo.classId);
      setRequests((current) =>
        current.filter(
          (item) =>
            !(
              item.request.userName === note.request.userName &&
              item.classInfo.classId === note.classInfo.classId
            )
        )
      );
      alert(successMessage);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Could not answer this request.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 pt-20 pb-10 px-4 text-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="col-span-1 bg-white border border-blue-100 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition">
          <h2 className="text-lg font-semibold text-blue-800 mb-3">Create a New Class</h2>
          <button
            onClick={() => navigate('/myClasses')}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition font-medium"
          >
            + Create Class
          </button>
        </div>

        <StatTile
          label="Classes I Teach"
          value={taughtCount}
          tone="bg-blue-100 text-blue-900"
        />
        <StatTile
          label="Classes I Joined"
          value={enrolledCount}
          tone="bg-emerald-100 text-emerald-900"
        />
        <StatTile
          label="My Requests Awaiting Approval"
          value={awaitingCount}
          tone="bg-yellow-100 text-yellow-900"
        />
        <StatTile
          label="Requests To Answer"
          value={requests.length}
          tone="bg-purple-100 text-purple-900"
        />

        {/* The teacher's queue: answer a request without leaving the dashboard. */}
        <div className="col-span-1 md:col-span-3 bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-700">🔔 Requests To Answer</h3>
            <button
              onClick={() => navigate('/notifications')}
              className="text-sm text-blue-600 hover:underline"
            >
              See all
            </button>
          </div>

          {loading && <p className="text-gray-500">Loading...</p>}

          {!loading && requests.length === 0 && (
            <p className="text-gray-500">No one is waiting for your approval right now.</p>
          )}

          {requests.map((note) => (
            <div
              key={`${note.request.userName}-${note.classInfo.classId}`}
              className="flex items-center justify-between gap-4 border-b last:border-b-0 py-3"
            >
              <div className="text-sm">
                <p className="font-medium text-gray-800">
                  {note.student?.name || note.request.userName}
                </p>
                <p className="text-gray-500">
                  wants to join {note.classInfo.title} ({note.classInfo.classId})
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => answer(approveRequest, note, 'Student approved.')}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded"
                >
                  Approve
                </button>
                <button
                  onClick={() => answer(declineRequest, note, 'Request declined.')}
                  className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded"
                >
                  Decline
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
