import React, { useState, useEffect } from 'react';
import { fetchClasses } from '../API/ClassApi';
import ClassCard from '../components/ClassCard';
import axios from "axios";

const HomePage = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [subjectFilter, setSubjectFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [titleFilter, setTitleFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [userDistrict, setUserDistrict] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [showClasses, setShowClasses] = useState(false);

  useEffect(() => {
    const loadClasses = async () => {
      try {
        const data = await fetchClasses();
        setClasses(data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    loadClasses();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const district = data.address.district || data.address.county || data.address.state_district || '';
          const cleanedDistrict = district.replace(" District", "").trim();
          setUserDistrict(cleanedDistrict);
          if (!locationFilter) 
            {
              setLocationFilter(cleanedDistrict);
            }

        } catch (error) {
          console.error("Error getting district:", error);
        }

      }, (error) => {
        console.error("Geolocation error:", error.message);
        alert("Unable to retrieve your location.");
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
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

    const effectiveLocation = locationFilter || userDistrict;

    if (effectiveLocation) {
      filtered = filtered.filter((cls) =>
        cls.location.toLowerCase().includes(effectiveLocation.toLowerCase())
      );
    }

    setFilteredClasses(filtered);
  }, [subjectFilter, teacherFilter, titleFilter, locationFilter, userDistrict, classes]);

  const handleEnroll = async (classData) => {
    const userName = localStorage.getItem("username");
    const dataToSend = {
      userName: userName,
      classId: classData.classId,
      isJoined: false,
    };

    try {
      const response = await axios.post("http://localhost:3000/api/userClassDetails/add", dataToSend);

      if (response.status === 200 || response.status === 201) {
        alert("✅ Enrolled successfully!");
      } else {
        alert("❌ Enrollment failed.");
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      alert("❌ Something went wrong.");
    }
  };

  const handleFindTutorClick = () => {
    setShowIntro(false);
    setShowClasses(true);
  };

  return (
    <div className="container mx-auto p-4 mt-28">
      {showIntro && (
        <>
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
                <img src="https://th.bing.com/th/id/OIP.9sCiEYWxpuhY5wsIW7lNAQHaHa?cb=iwc2&rs=1&pid=ImgDetMain" alt="subject" />
              </div>
              <div className="p-6 bg-blue-100 rounded-lg shadow-lg hover:shadow-xl transition">
                <h3 className="text-2xl font-semibold mb-3">Easy</h3>
                <p className="text-lg">Book a tutor with just a few clicks and start learning!</p>
                <img src="https://th.bing.com/th/id/OIP.zOiuj5M6kYytp1a2_4jXkgHaHa?cb=iwc2&rs=1&pid=ImgDetMain" alt="easy" />
              </div>
            </div>
          </div>
        </>
      )}

      {showClasses && (
        <div>
          <div className="mb-6">
            <div className="flex gap-4 justify-center mb-6 flex-wrap">
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
                placeholder="Filter by location (optional)"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="p-2 border rounded"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <ClassCard key={cls.classId} classData={cls} onEnroll={handleEnroll} />
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
