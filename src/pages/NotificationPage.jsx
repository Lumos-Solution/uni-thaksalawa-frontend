import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications } from '../service/NotificationService';

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

    if (loading) return <div style={{ padding: '20px' }}>Loading notifications...</div>;
    if (error) return <div style={{ padding: '20px' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>

            {notifications.map((note, i) => {
                console.log(`Rendering notification ${i + 1}:`, note);
                console.log(`Rendering notification ${i + 1}:`, note.request.classId);
                return (
                    <NotificationCard
                        key={i}
                        classId={note.classInfo.classId}
                        title={note.classInfo.title}
                        userName={note.request.userName}
                    />
                );
            })}
        </div>
    );
}

export default NotificationPage;
