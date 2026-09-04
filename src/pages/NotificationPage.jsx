import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications } from '../service/NotificationService';

function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotifications()
            .then(setNotifications)
            .catch((err) => {
                console.error(err);
                setError('Failed to load notifications');
            })
            .finally(() => setLoading(false));
    }, []);

    // An answered request is gone from the server, so it is dropped from the list.
    const removeAnswered = (userName, classId) => {
        setNotifications((current) =>
            current.filter(
                (note) => !(note.request.userName === userName && note.classInfo.classId === classId)
            )
        );
    };

    if (loading) return <div className="p-5 mt-28">Loading notifications...</div>;
    if (error) return <div className="p-5 mt-28 text-red-500">{error}</div>;

    return (
        <div className="p-5 mt-28">
            <h2 className="text-2xl font-bold mb-4">Join Requests</h2>

            {notifications.length === 0 ? (
                <p>No one is waiting for your approval right now.</p>
            ) : (
                notifications.map((note) => (
                    <NotificationCard
                        key={`${note.request.userName}-${note.classInfo.classId}`}
                        classInfo={note.classInfo}
                        student={note.student}
                        userName={note.request.userName}
                        onAnswered={removeAnswered}
                    />
                ))
            )}
        </div>
    );
}

export default NotificationPage;
