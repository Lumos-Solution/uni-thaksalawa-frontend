import React, { useState, useEffect, useMemo } from 'react';
import { fetchClasses } from '../api/classApi';
import ClassCard from '../components/ClassCard';
import api from '../auth/apiClient';
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

  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [showClasses, setShowClasses] = useState(false);

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch((error) => console.error('Error fetching classes:', error));
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
    <div className="container mx-auto p-4 mt-28">
      {!showClasses && (
        <>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Find Your Tutor</h1>
            <p className="text-lg mb-6">
              Find the best tutors in any subject at your convenience. Choose from a variety of
              experienced teachers.
            </p>
            <button
              onClick={() => setShowClasses(true)}
              className="bg-blue-500 text-white py-3 px-8 rounded-full text-2xl hover:bg-blue-600 transition"
            >
              Find Your Tutor
            </button>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Uni Thaksalawa?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition">
                <h3 className="text-2xl font-semibold mb-3">Best Teachers</h3>
                <p className="text-lg">Top-rated, qualified tutors ready to help you succeed.</p>
                <img
                  src="https://th.bing.com/th/id/OIP.2Ecc2kJaDoiau98cs8wETgHaE8?cb=iwc2&rs=1&pid=ImgDetMain"
                  alt="teacher"
                />
              </div>
              <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition">
                <h3 className="text-2xl font-semibold mb-3">Any Subject</h3>
                <p className="text-lg">From Math to Languages, we have tutors for every subject!</p>
                <img
                  src="https://th.bing.com/th/id/OIP.9sCiEYWxpuhY5wsIW7lNAQHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
                  alt="subject"
                />
              </div>
              <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition">
                <h3 className="text-2xl font-semibold mb-3">Close To You</h3>
                <p className="text-lg">See the physical classes held within a few km of you.</p>
                <img
                  src="https://th.bing.com/th/id/OIP.zOiuj5M6kYytp1a2_4jXkgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
                  alt="nearby"
                />
              </div>
            </div>
          </div>
        </>
      )}

      {showClasses && (
        <div>
          <div className="flex justify-center gap-2 mb-6">
            {['physical', 'online'].map((mode) => (
              <button
                key={mode}
                onClick={() => setClassMode(mode)}
                className={`px-6 py-2 rounded-full capitalize transition ${
                  classMode === mode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="flex gap-4 justify-center mb-2 flex-wrap">
            <input
              type="text"
              placeholder="Filter by subject"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Filter by teacher"
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
              className="p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Filter by title"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
              className="p-2 border rounded"
            />

            {classMode === 'physical' && (
              <select
                value={maxDistanceKm}
                onChange={(e) => setMaxDistanceKm(Number(e.target.value))}
                className="p-2 border rounded"
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
                  onEnroll={handleEnroll}
                />
              ))
            ) : (
              <p>No classes available matching your filters.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
