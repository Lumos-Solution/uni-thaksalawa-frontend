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

    const handleConsider = async (studentUsername, classId) => {
        try {
            const result = await transferStudent(studentUsername, classId);
            if (result.success) {
                alert('Transfer successful!');
                setNotifications(prev =>
                    prev.filter(
                        note => !(note.studentUsername === studentUsername && note.classId === classId)
                    )
                );
            } else {
                alert('Transfer failed.');
            }
        } catch (error) {
            console.error('Transfer error:', error);
            alert('Error during transfer.');
        }
    };

    if (loading) return <div style={{ padding: '20px' }}>Loading notifications...</div>;
    if (error) return <div style={{ padding: '20px' }}>{error}</div>;

    return (
        <div style={{ padding: '20px' }}>
            <h2 className="text-2xl font-bold mb-4">My Notifications</h2>
            {notifications.length === 0 ? (
                <p>No notifications available.</p>
            ) : (
                notifications.map((note, i) => (
                    <NotificationCard
                        key={i}
                        index={i + 1}
                        subject={note.subject}
                        message={note.message}
                        studentUsername={note.studentUsername}
                        classId={note.classId}
                        onConsider={handleConsider}
                    />
                ))
            )}
        </div>
    );
}

export default NotificationPage;
