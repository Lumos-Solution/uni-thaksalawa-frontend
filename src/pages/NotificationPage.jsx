import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications, transferStudent } from '../service/NotificationService';

function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadNotifications = async () => {
            try {
                const data = await fetchNotifications();
                setNotifications(data);
            } catch (err) {
                setError('Failed to load notifications');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadNotifications();
    }, []);


    if (loading) return <div className="p-5">Loading notifications...</div>;
    if (error) return <div className="p-5 text-red-500">{error}</div>;

    return (
        <div className="p-5 mt-28">
            <h2 className="text-2xl font-bold mb-4">My Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications found.</p>
            ) : (
                notifications.map((note, i) => (
                    <NotificationCard
                        key={i}
                        index={i + 1}
                        classId={note.classInfo.classId}
                        title={note.classInfo.title}
                        userName={note.request.userName}
                        setNotifications={setNotifications}
                        notifications={notifications}
                    />
                ))
            )}
        </div>
    );
}

export default NotificationPage;
