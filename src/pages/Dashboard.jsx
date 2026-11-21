import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CalendarDays,
  Check,
  Clock,
  GraduationCap,
  Hourglass,
  Inbox,
  MapPin,
  Monitor,
  Plus,
  Search,
  UserCircle,
  X,
} from 'lucide-react';
import { getClassesByUsername } from '../service/MyClassService';
import { getMyEnrollments } from '../service/MyEnrollmentService';
import {
  approveRequest,
  declineRequest,
  fetchNotifications,
} from '../service/NotificationService';
import { getCurrentUserName } from '../auth/tokenStorage';

const StatTile = ({ label, value, icon, tone, onClick, loading }) => (
  <button
    onClick={onClick}
    className="group text-left bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition"
  >
    <div className="flex items-center justify-between">
      <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${tone}`}>
        {icon}
      </span>
      <span className="text-xs text-slate-400 group-hover:text-indigo-600 transition">View →</span>
    </div>
    <p className="text-3xl font-bold text-slate-900 mt-4">
      {loading ? <span className="inline-block h-8 w-10 rounded bg-slate-100 animate-pulse" /> : value}
    </p>
    <p className="text-sm text-slate-500 mt-1">{label}</p>
  </button>
);

const QuickAction = ({ icon, label, hint, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-3 w-full text-left p-3 rounded-xl hover:bg-indigo-50 transition"
  >
    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
      {icon}
    </span>
    <span>
      <span className="block font-medium text-slate-800">{label}</span>
      <span className="block text-xs text-slate-500">{hint}</span>
    </span>
  </button>
);

// Class dates are stored as plain strings, so anything unparseable is treated
// as "no date" and dropped from the upcoming list rather than mis-sorted.
const startOf = (cls) => {
  const when = new Date(`${cls.date}T${cls.time || '00:00'}`);
  return Number.isNaN(when.getTime()) ? null : when;
};

const initials = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '?';

const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard = () => {
  const navigate = useNavigate();
  const username = getCurrentUserName();

  const [taught, setTaught] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [awaitingCount, setAwaitingCount] = useState(0);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyKey, setBusyKey] = useState(null);

  /*
   * Everything on this page is real: the classes this user teaches, the classes
   * they were approved into, and the requests waiting on their answer. A failing
   * call leaves its own figure at zero rather than blanking the whole page.
   */
  useEffect(() => {
    if (!username) return;

    const load = async () => {
      const [taughtRes, enrollments, pending] = await Promise.allSettled([
        getClassesByUsername(username),
        getMyEnrollments(),
        fetchNotifications(),
      ]);

      if (taughtRes.status === 'fulfilled') setTaught(taughtRes.value);
      if (enrollments.status === 'fulfilled') {
        setEnrolled(enrollments.value.approved);
        setAwaitingCount(enrollments.value.pending.length);
      }
      if (pending.status === 'fulfilled') setRequests(pending.value);

      setLoading(false);
    };

    load();
  }, [username]);

  // The next few sessions across both roles, soonest first.
  const upcoming = useMemo(() => {
    const now = new Date();
    return [
      ...taught.map((cls) => ({ cls, role: 'Teaching' })),
      ...enrolled.map((cls) => ({ cls, role: 'Attending' })),
    ]
      .map((item) => ({ ...item, when: startOf(item.cls) }))
      .filter(({ when }) => when && when >= now)
      .sort((a, b) => a.when - b.when)
      .slice(0, 5);
  }, [taught, enrolled]);

  const answer = async (action, note, successMessage) => {
    const key = `${note.request.userName}-${note.classInfo.classId}`;
    setBusyKey(key);
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
    } finally {
      setBusyKey(null);
    }
  };

  const today = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-blue-50 pt-24 pb-12 px-4 text-slate-800">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Welcome banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 text-white p-6 md:p-8 shadow-xl shadow-indigo-500/20">
          <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute right-24 -bottom-16 h-40 w-40 rounded-full bg-white/10" />
          <GraduationCap className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 opacity-20" size={120} />

          <div className="relative">
            <p className="text-indigo-100 text-sm">{today}</p>
            <h1 className="text-2xl md:text-3xl font-bold mt-1">
              {greeting()}, {username || 'there'} 👋
            </h1>
            <p className="text-indigo-100 mt-2 max-w-xl">
              {requests.length > 0
                ? `You have ${requests.length} join request${requests.length === 1 ? '' : 's'} waiting for your answer.`
                : 'Here is what is happening with your classes today.'}
            </p>
            <div className="flex flex-wrap gap-3 mt-5">
              <button
                onClick={() => navigate('/myClasses')}
                className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-5 py-2 rounded-full hover:bg-indigo-50 transition"
              >
                <Plus size={18} /> Create Class
              </button>
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center gap-2 bg-white/15 border border-white/30 font-medium px-5 py-2 rounded-full hover:bg-white/25 transition"
              >
                <Search size={18} /> Browse Classes
              </button>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatTile
            label="Classes I Teach"
            value={taught.length}
            icon={<BookOpen size={22} />}
            tone="bg-indigo-100 text-indigo-700"
            onClick={() => navigate('/myClasses')}
            loading={loading}
          />
          <StatTile
            label="Classes I Joined"
            value={enrolled.length}
            icon={<GraduationCap size={22} />}
            tone="bg-emerald-100 text-emerald-700"
            onClick={() => navigate('/myEnrollments')}
            loading={loading}
          />
          <StatTile
            label="Awaiting Approval"
            value={awaitingCount}
            icon={<Hourglass size={22} />}
            tone="bg-amber-100 text-amber-700"
            onClick={() => navigate('/myEnrollments')}
            loading={loading}
          />
          <StatTile
            label="Requests To Answer"
            value={requests.length}
            icon={<Inbox size={22} />}
            tone="bg-rose-100 text-rose-700"
            onClick={() => navigate('/notifications')}
            loading={loading}
          />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* The teacher's queue: answer a request without leaving the dashboard. */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Inbox size={20} className="text-indigo-600" /> Requests To Answer
                {requests.length > 0 && (
                  <span className="ml-1 text-xs font-semibold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
                    {requests.length}
                  </span>
                )}
              </h3>
              <button
                onClick={() => navigate('/notifications')}
                className="text-sm text-indigo-600 hover:underline"
              >
                See all
              </button>
            </div>

            {loading && (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-14 rounded-xl bg-slate-100 animate-pulse" />
                ))}
              </div>
            )}

            {!loading && requests.length === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-10 text-slate-500">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 mb-3">
                  <Check size={28} />
                </span>
                <p className="font-medium text-slate-700">You're all caught up</p>
                <p className="text-sm">No one is waiting for your approval right now.</p>
              </div>
            )}

            <ul className="divide-y divide-slate-100">
              {requests.map((note) => {
                const key = `${note.request.userName}-${note.classInfo.classId}`;
                const name = note.student?.name || note.request.userName;
                const busy = busyKey === key;
                return (
                  <li key={key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 font-semibold text-sm">
                        {initials(name)}
                      </span>
                      <div className="text-sm min-w-0">
                        <p className="font-medium text-slate-800 truncate">{name}</p>
                        <p className="text-slate-500 truncate">
                          wants to join <span className="text-slate-700">{note.classInfo.title}</span>{' '}
                          <span className="text-slate-400">({note.classInfo.classId})</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:shrink-0">
                      <button
                        disabled={busy}
                        onClick={() => answer(approveRequest, note, 'Student approved.')}
                        className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white text-sm px-4 py-1.5 rounded-lg transition"
                      >
                        <Check size={16} /> Approve
                      </button>
                      <button
                        disabled={busy}
                        onClick={() => answer(declineRequest, note, 'Request declined.')}
                        className="inline-flex items-center gap-1 bg-white border border-rose-200 text-rose-600 hover:bg-rose-50 disabled:opacity-50 text-sm px-4 py-1.5 rounded-lg transition"
                      >
                        <X size={16} /> Decline
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Quick Actions</h3>
            <div className="space-y-1">
              <QuickAction icon={<Plus size={20} />} label="Create a class" hint="Publish a new physical or online class" onClick={() => navigate('/myClasses')} />
              <QuickAction icon={<Search size={20} />} label="Find a tutor" hint="Browse classes near you" onClick={() => navigate('/')} />
              <QuickAction icon={<GraduationCap size={20} />} label="My enrollments" hint="Classes you have joined" onClick={() => navigate('/myEnrollments')} />
              <QuickAction icon={<UserCircle size={20} />} label="Edit profile" hint="Update your details and photo" onClick={() => navigate('/profile')} />
            </div>
          </div>
        </section>

        {/* Upcoming classes */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2 mb-4">
            <CalendarDays size={20} className="text-indigo-600" /> Upcoming Classes
          </h3>

          {loading ? (
            <div className="h-20 rounded-xl bg-slate-100 animate-pulse" />
          ) : upcoming.length === 0 ? (
            <p className="text-slate-500 text-sm py-4">
              Nothing scheduled yet. Create a class or join one to see it here.
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {upcoming.map(({ cls, role, when }) => (
                <li
                  key={`${role}-${cls.classId}`}
                  className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/40 transition"
                >
                  <div className="flex flex-col items-center justify-center w-14 shrink-0 rounded-xl bg-indigo-600 text-white py-2">
                    <span className="text-xs uppercase">
                      {when.toLocaleDateString(undefined, { month: 'short' })}
                    </span>
                    <span className="text-xl font-bold leading-none">{when.getDate()}</span>
                  </div>
                  <div className="min-w-0 text-sm">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-slate-800 truncate">{cls.title}</p>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          role === 'Teaching'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-emerald-100 text-emerald-700'
                        }`}
                      >
                        {role}
                      </span>
                    </div>
                    <p className="text-slate-500">{cls.subject}</p>
                    <p className="text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Clock size={14} /> {cls.time}
                      </span>
                      <span className="inline-flex items-center gap-1 capitalize">
                        {cls.classType === 'online' ? <Monitor size={14} /> : <MapPin size={14} />}
                        {cls.classType === 'online' ? 'Online' : cls.location || 'Physical'}
                      </span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
