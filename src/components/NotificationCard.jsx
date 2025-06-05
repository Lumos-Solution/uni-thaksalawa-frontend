import React from 'react';

function NotificationCard({ index, subject, message, studentUsername, classId, onConsider }) {
    return (
        <div className="bg-white shadow-md rounded-xl p-4 mb-5 w-full max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <span className="text-xl">🔔</span>
                    <input
                        type="text"
                        value={index}
                        readOnly
                        className="border rounded px-2 py-1 w-full md:w-28 text-sm"
                    />
                    <input
                        type="text"
                        value={subject}
                        readOnly
                        className="border rounded px-2 py-1 w-full md:w-32 text-sm"
                    />
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                    <button className="bg-gray-300 hover:bg-gray-400 text-sm px-4 py-1 rounded">
                        Ignore
                    </button>
                    <button
                        onClick={() => onConsider(studentUsername, classId)}
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded"
                    >
                        Consider
                    </button>
                </div>
            </div>
            <textarea
                readOnly
                value={message}
                className="mt-3 w-full p-3 text-sm border rounded resize-none bg-gray-50"
                rows={3}
            />
        </div>
    );
}

export default NotificationCard;
