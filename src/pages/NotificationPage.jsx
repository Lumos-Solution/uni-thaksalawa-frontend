import React, { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard';
import { fetchNotifications } from '../services/notificationService';

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
            <h2>My Notifications</h2>
            {notifications.map((note, i) => (
                <NotificationCard key={i} {...note} />
            ))}
        </div>
    );
}

export default NotificationPage;
