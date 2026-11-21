import React, { useState, useEffect, useMemo } from 'react';
import { fetchClasses } from '../api/classApi';
import ClassCard from '../components/ClassCard';
import api from '../auth/apiClient';
import { getCurrentUserName } from '../auth/tokenStorage';
import { getMyEnrollments } from '../service/MyEnrollmentService';
import { getClassesByUsername } from '../service/MyClassService';
import { DEFAULT_DISTANCE_KM, DISTANCE_OPTIONS, distanceInKm } from '../lib/distance';

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');

  // Physical classes are searched by how far away they are; online ones have no
  // place at all, so the radius control is hidden for them.
  const [classMode, setClassMode] = useState('physical');
  const [maxDistanceKm, setMaxDistanceKm] = useState(DEFAULT_DISTANCE_KM);

  // classId -> "approved" | "pending", so a class the student already has is
  // not offered again.
  const [joinStatuses, setJoinStatuses] = useState({});

  // The classIds this user teaches, so their own class is never offered back to
  // them as something to join.
  const [ownClassIds, setOwnClassIds] = useState([]);

  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [showClasses, setShowClasses] = useState(false);

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch((error) => console.error('Error fetching classes:', error));
  }, []);

  // A signed-out visitor can browse, so a failure here is not worth reporting -
  // every class simply stays open to request.
  useEffect(() => {
    if (!getCurrentUserName()) return;

    getMyEnrollments()
      .then(({ approved, pending }) => {
        const statuses = {};
        approved.forEach((cls) => (statuses[cls.classId] = 'approved'));
        pending.forEach((cls) => (statuses[cls.classId] = 'pending'));
        setJoinStatuses(statuses);
      })
      .catch((error) => console.error('Could not read your enrollments:', error));
  }, []);

  // A student teaches nothing, so an empty list here is the normal case.
  useEffect(() => {
    const username = getCurrentUserName();
    if (!username) return;

    getClassesByUsername(username)
      .then((myClasses) => setOwnClassIds(myClasses.map((cls) => cls.classId)))
      .catch((error) => console.error('Could not read your own classes:', error));
  }, []);

  // Asked for once on load so the radius filter has something to measure from.
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('This browser cannot share your location.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError('');
      },
      (error) => {
        console.error('Geolocation error:', error.message);
        setLocationError('Location is off, so nearby classes cannot be measured.');
      }
    );
  }, []);

  /*
   * Every visible class is paired with its distance so the card can show it and
   * the list can be ordered nearest-first.
   */
  const visibleClasses = useMemo(() => {
    const matchesText = (value, filter) =>
      !filter || (value || '').toLowerCase().includes(filter.toLowerCase());

    return classes
      .filter((cls) => cls.classType === classMode)
      .filter(
        (cls) =>
          matchesText(cls.subject, subjectFilter) &&
          matchesText(cls.teacherName, teacherFilter) &&
          matchesText(cls.title, titleFilter)
      )
      .map((cls) => ({
        cls,
        distanceKm: distanceInKm(userLocation, cls.coordinates),
      }))
      .filter(({ distanceKm }) => {
        if (classMode !== 'physical' || !userLocation) return true;
        // A class with no pin cannot be placed on the map, so it is left out of
        // a distance-limited search rather than shown at an unknown distance.
        return distanceKm !== null && distanceKm <= maxDistanceKm;
      })
      .sort((a, b) => (a.distanceKm ?? Infinity) - (b.distanceKm ?? Infinity));
  }, [classes, classMode, subjectFilter, teacherFilter, titleFilter, userLocation, maxDistanceKm]);

  const handleEnroll = async (classData) => {
    try {
      // The server takes the student from the token, so only the class is sent.
      await api.post('/api/userClassDetails/add', { classId: classData.classId });
      setJoinStatuses((current) => ({ ...current, [classData.classId]: 'pending' }));
      alert('Request sent. The teacher will approve or decline it.');
    } catch (error) {
      console.error('Error requesting to join:', error);
      if (error.response?.status === 401) {
        alert('Please sign in before requesting to join.');
      } else {
        alert(error.response?.data?.message || 'Something went wrong.');
      }
    }
  };

  return (
    // The illustration keeps its artwork at the edges, so the content column sits
    // over the clear centre. bg-fixed keeps it still while the class list scrolls.
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat md:bg-fixed"
      style={{ backgroundImage: "url('/home-bg.png')" }}
    >
    <div className="container mx-auto px-4 pt-28 pb-16">
      {!showClasses && (
        <>
          <section className="text-center max-w-3xl mx-auto pt-8 md:pt-16 mb-16">
            <span className="inline-block mb-4 px-4 py-1 rounded-full bg-white/70 backdrop-blur text-indigo-700 text-sm font-medium shadow-sm">
              Physical &amp; online classes across Sri Lanka
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-5">
              Find Your{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                Tutor
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-8">
              Find the best tutors in any subject at your convenience. Choose from a variety of
              experienced teachers.
            </p>
            <button
              onClick={() => setShowClasses(true)}
              className="bg-indigo-600 text-white py-3 px-10 rounded-full text-xl font-semibold shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:-translate-y-0.5 transition"
            >
              Find Your Tutor
            </button>
          </section>

          <section className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Why Choose Uni Thaksalawa?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Best Teachers',
                  text: 'Top-rated, qualified tutors ready to help you succeed.',
                  img: '/best_teachers.png',
                  alt: 'teacher',
                },
                {
                  title: 'Any Subject',
                  text: 'From Math to Languages, we have tutors for every subject!',
                  img: 'https://th.bing.com/th/id/OIP.9sCiEYWxpuhY5wsIW7lNAQHaHa?cb=iwc2&rs=1&pid=ImgDetMain',
                  alt: 'subject',
                },
                {
                  title: 'Close To You',
                  text: 'See the physical classes held within a few km of you.',
                  img: 'https://th.bing.com/th/id/OIP.zOiuj5M6kYytp1a2_4jXkgHaHa?cb=iwc2&rs=1&pid=ImgDetMain',
                  alt: 'nearby',
                },
              ].map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 bg-white/75 backdrop-blur-md border border-white/60 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                >
                  <h3 className="text-2xl font-semibold text-indigo-900 mb-3">{feature.title}</h3>
                  <p className="text-lg text-slate-600">{feature.text}</p>
                  <img
                    src={feature.img}
                    alt={feature.alt}
                    className="mt-4 w-full aspect-square object-contain bg-white rounded-xl"
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {showClasses && (
        <div>
          <div className="flex justify-center gap-2 mb-6">
            {['physical', 'online'].map((mode) => (
              <button
                key={mode}
                onClick={() => setClassMode(mode)}
                className={`px-6 py-2 rounded-full capitalize font-medium shadow-sm transition ${
                  classMode === mode
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white/80 backdrop-blur text-slate-700 hover:bg-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex gap-3 justify-center mb-2 flex-wrap p-4 mx-auto max-w-4xl bg-white/70 backdrop-blur-md rounded-2xl shadow-md">
            <input
              type="text"
              placeholder="Filter by subject"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="p-2 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Filter by teacher"
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              className="p-2 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="text"
              placeholder="Filter by title"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="p-2 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            {classMode === 'physical' && (
              <select
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                className="p-2 border border-indigo-100 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                disabled={!userLocation}
              >
                {DISTANCE_OPTIONS.map((km) => (
                  <option key={km} value={km}>
                    Within {km} km
                  </option>
                ))}
              </select>
            )}
          </div>

          {classMode === 'physical' && locationError && (
            <p className="text-center text-sm text-amber-700 mb-4">
              {locationError} Showing every physical class instead.
            </p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {visibleClasses.length > 0 ? (
              visibleClasses.map(({ cls, distanceKm }) => (
                <ClassCard
                  key={cls.classId}
                  classData={cls}
                  distanceKm={classMode === 'physical' ? distanceKm : null}
                  joinStatus={joinStatuses[cls.classId]}
                  isOwnClass={ownClassIds.includes(cls.classId)}
                  onEnroll={handleEnroll}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-600 bg-white/70 backdrop-blur rounded-xl py-8">
                No classes available matching your filters.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default HomePage;
