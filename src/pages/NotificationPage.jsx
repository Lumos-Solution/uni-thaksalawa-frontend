import React from 'react';
import NotificationCard from '../components/NotificationCard';

function NotificationPage() {
    const notifications = [
        {
            index: '2023001',
            subject: 'CS101',
            message: 'You missed the assignment submission deadline. Contact your lecturer.'
        },
        {
            index: '2023002',
            subject: 'MA201',
            message: 'Mid-term marks have been uploaded to the LMS.'
        },
        {
            index: '2023003',
            subject: 'EN105',
            message: 'New Zoom class scheduled for next Monday at 8 AM.'
        }
    ];

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
