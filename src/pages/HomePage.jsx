import React, { useState, useEffect } from 'react';
import { mockClasses } from '../api/mockData'; // Import mock data
import ClassCard from '../components/ClassCard';

const HomePage = () => {
  const [classes, setClasses] = useState(mockClasses);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [showIntro, setShowIntro] = useState(true); // Controls the visibility of the intro section
  const [showClasses, setShowClasses] = useState(false); // Controls the visibility of class listings after button click

  useEffect(() => {
    // Get user's location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    // Filter classes based on applied filters
    let filtered = classes;

    if (subjectFilter) {
      filtered = filtered.filter((cls) =>
        cls.subject.toLowerCase().includes(subjectFilter.toLowerCase())
      );
    }
    if (teacherFilter) {
      filtered = filtered.filter((cls) =>
        cls.teacher.toLowerCase().includes(teacherFilter.toLowerCase())
      );
    }
    if (titleFilter) {
      filtered = filtered.filter((cls) =>
        cls.title.toLowerCase().includes(titleFilter.toLowerCase())
      );
    }
    if (locationFilter) {
      filtered = filtered.filter((cls) =>
        cls.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Sort classes by distance from user's location
    if (userLocation) {
      filtered = filtered.sort((a, b) => {
        const distanceA = getDistance(userLocation, a.location);
        const distanceB = getDistance(userLocation, b.location);
        return distanceA - distanceB;
      });
    }

    setFilteredClasses(filtered);
  }, [subjectFilter, teacherFilter, titleFilter, locationFilter, userLocation, showClasses]);

  const getDistance = (userLocation, classLocation) => {
    const [userLat, userLon] = [userLocation.latitude, userLocation.longitude];
    const classCoords = getCoordinatesForLocation(classLocation); // Implement this function to fetch lat/lon for class location
    const [classLat, classLon] = classCoords;

    const R = 6371; // Radius of Earth in km
    const dLat = toRad(classLat - userLat);
    const dLon = toRad(classLon - userLon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(userLat)) * Math.cos(toRad(classLat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  };

  const toRad = (value) => {
    return value * (Math.PI / 180);
  };

  const getCoordinatesForLocation = (location) => {
    // For simplicity, use hardcoded coordinates (you can replace this with a geocoding API later)
    const locationCoordinates = {
      'Moratuwa': [6.9869, 79.9985],
      'Galle': [6.0535, 80.2200],
      'Ratnapura': [6.4345, 80.3937],
      'Kurunagala': [7.4675, 80.3684],
    };
    return locationCoordinates[location] || [0, 0]; // Default to [0, 0] if location is not found
  };

  const handleEnroll = (classId) => {
    console.log(`Enroll request sent for class ${classId}`);
    // Call API to enroll the user in class (PUT request)
  };

  const handleFindTutorClick = () => {
    setShowIntro(false);  // Hide the intro section when the button is clicked
    setShowClasses(true); // Show the class listings
  };

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section with Button */}
      {showIntro && (
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Find Your Tutor</h1>
          <p className="text-lg mb-6">
            Find the best tutors in any subject at your convenience. Choose from a variety of experienced teachers.
          </p>
          <button
            onClick={handleFindTutorClick}
            className="bg-blue-500 text-white py-3 px-8 rounded-full text-2xl hover:bg-blue-600 transition"
          >
            Find Your Tutor
          </button>
        </div>
      )}

      {/* Why Choose Us Section */}
      {showIntro && (
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold mb-4">Why Choose Uni Thaksalawa?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-3">Best Teachers</h3>
              <p className="text-lg">Top-rated, qualified tutors ready to help you succeed.</p>
              <img src="https://th.bing.com/th/id/OIP.2Ecc2kJaDoiau98cs8wETgHaE8?cb=iwc2&rs=1&pid=ImgDetMain" alt="teacher" />
            </div>
            <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-3">Any Subject</h3>
              <p className="text-lg">From Math to Languages, we have tutors for every subject!</p>
              <img src="https://th.bing.com/th/id/OIP.9sCiEYWxpuhY5wsIW7lNAQHaHa?cb=iwc2&rs=1&pid=ImgDetMain" alt="sub image" />
            </div>
            <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-semibold mb-3">Easy</h3>
              <p className="text-lg">Book a tutor with just a few clicks and start learning!</p>
              <img src="https://th.bing.com/th/id/OIP.zOiuj5M6kYytp1a2_4jXkgHaHa?cb=iwc2&rs=1&pid=ImgDetMain" alt="easy" />
            </div>
          </div>
        </div>
      )}

      {/* Filters and Class Listings */}
      {showClasses && (
        <div>
          {/* Filters */}
          <div className="mb-6">
            <div className="flex gap-4 justify-center mb-6">
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
              <input
                type="text"
                placeholder="Filter by location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="p-2 border rounded"
              />
            </div>

            {/* Display filtered and sorted classes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <ClassCard key={cls.id} classData={cls} onEnroll={handleEnroll} />
                ))
              ) : (
                <p>No classes available matching your filters.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
