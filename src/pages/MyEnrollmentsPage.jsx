import {Card} from "../components/Card.jsx";
import React, {useEffect, useState} from "react";
import {getEnrolledClassesByUsername} from "../service/MyEnrollmentService.js";
// import maths from "../assets/Card/maths.jpg";
// import physics from "../assets/Card/physics.jpg";
// import chemistry from "../assets/Card/chemistry.jpg"; 
// export default function MyEnrollmentsPage() {
//     return (

//         <div className="my-classes-page">

//             <h2 className="text-2xl font-bold mb-4 page title" >My Enrolled Classes</h2>
//             <p>These are classes that you enrolled in and are currently studying</p>
//             <p>Click on the button to view and see class resources</p>
//             <br/>

//             <div className="class-container">

//                 <Card
//                 image={maths}
//                 title="Math Class"
//                 text="Grade 11"
//                 link="https://example.com/math-class"
//                 time={<span><strong>Time:</strong> 10am - 11am</span>}
//                 date={<span><strong>Date:</strong> 2023-10-01</span>}
//                 teacher={<span><strong>Teacher:</strong> John Doe</span>}
//                 />

//                 <Card
//                 image={physics}
//                 title="Physics Class"
//                 text="Grade 12"
//                 link="https://example.com/physics-class"
//                 time={<span><strong>Time:</strong> 1pm - 2pm</span>}
//                 date={<span><strong>Date:</strong> 2023-10-02</span>}
//                 teacher={<span><strong>Teacher:</strong> Jane Smith</span>}
//                 />

//                 <Card
//                 image={chemistry}
//                 title="Chemistry Class"
//                 text="Grade 11"
//                 link="https://example.com/chemistry-class"
//                 time={<span><strong>Time:</strong> 3pm - 4pm</span>}
//                 date={<span><strong>Date:</strong> 2023-10-03</span>}
//                 teacher={<span><strong>Teacher:</strong> Michael Brown</span>}
//                 />

//       </div>

//         </div>
//     )
// }

// src/pages/MyEnrollmentsPage.jsx


const MyEnrollmentsPage = () => {
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get username from localStorage
    const username = localStorage.getItem("username");

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (username) {
                    const data = await getEnrolledClassesByUsername(username);
                    console.log(data);
                    setEnrolledClasses(data);
                } else {
                    console.warn("Username not found in localStorage");
                }
            } catch (error) {
                console.error("Failed to fetch enrolled classes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="p-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {enrolledClasses.map((cls, index) => (
                <Card
                    key={index}
                    classType={cls.classType}
                    title={cls.title}
                    subject={cls.subject}
                    location={cls.location}
                    date={cls.date}
                    time={cls.time}
                    fee={cls.fee}
                    image={cls.classImage} // assuming it's a URL or base64 image
                    link={`/class/${cls.classId}`} // or any route you want
                />
            ))}
        </div>
    );
};

export default MyEnrollmentsPage;
