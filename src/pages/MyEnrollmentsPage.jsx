import { Card } from "../components/Card.jsx";
import { useEffect, useState } from "react";
import { getMyEnrollments } from "../service/MyEnrollmentService.js";

const MyEnrollmentsPage = () => {
    const [approved, setApproved] = useState([]);
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getMyEnrollments()
            .then((data) => {
                setApproved(data.approved);
                setPending(data.pending);
            })
            .catch((err) => {
                console.error("Failed to fetch enrolled classes:", err);
                setError("Could not load your classes. Please sign in again.");
            })
            .finally(() => setLoading(false));
    }, []);

    // Both lists are drawn the same way; only the empty message and the badge differ.
    const classList = (items, emptyMessage, status) =>
        items.length === 0 ? (
            <p className="text-gray-500">{emptyMessage}</p>
        ) : (
            <div className="class-container">
                {items.map((cls) => (
                    <Card
                        key={cls.classId}
                        image={cls.classImage}
                        title={cls.title}
                        subject={cls.subject}
                        classType={cls.classType}
                        location={cls.location}
                        date={cls.date}
                        time={cls.time}
                        fee={cls.fee}
                        teacher={cls.teacherName}
                        status={status}
                    />
                ))}
            </div>
        );

    if (loading) return <p className="p-6 mt-28">Loading...</p>;
    if (error) return <p className="p-6 mt-28 text-red-500">{error}</p>;

    return (
        <div className="p-6 mt-28">
            <h2 className="text-2xl font-bold mb-4">My Enrollments</h2>
            {classList(
                approved,
                "No teacher has approved you into a class yet.",
                null
            )}

            <h2 className="text-2xl font-bold mt-10 mb-4">Waiting For Approval</h2>
            {classList(
                pending,
                "You have no requests waiting for an answer.",
                "Waiting for approval"
            )}
        </div>
    );
};

export default MyEnrollmentsPage;
