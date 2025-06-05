import React from 'react';

function NotificationCard({ index, classId, title, userName }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 mb-5 w-full max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
                <div className="text-2xl">🔔</div>
                <div className="flex-1">
                    <div className="mb-2">
                        <label className="block text-xs text-gray-500">Student Username</label>
                        <p className="text-sm font-medium text-gray-800">{userName}</p>
                    </div>
                    <div className="mb-2">
                        <label className="block text-xs text-gray-500">Class ID</label>
                        <p className="text-sm font-medium text-gray-800">{classId}</p>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-500">Class Title</label>
                        <p className="text-sm font-medium text-gray-800">{title}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <button className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-1 rounded">
                        Ignore
                    </button>
                    <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded">
                        Consider
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationCard;
