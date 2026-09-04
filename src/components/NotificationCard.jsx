import React, { useState } from 'react';
import { approveRequest, declineRequest } from '../service/NotificationService.js';

/**
 * One student's request to join one class, with the details the teacher needs
 * to decide. Approving or declining removes the card through onAnswered.
 */
function NotificationCard({ classInfo, student, userName, onAnswered }) {
    const [busy, setBusy] = useState(false);

    const answer = async (action, successMessage) => {
        setBusy(true);
        try {
            await action(userName, classInfo.classId);
            alert(successMessage);
            onAnswered(userName, classInfo.classId);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Could not answer this request.');
        } finally {
            setBusy(false);
        }
    };

    const handleDecline = () => {
        if (!window.confirm(`Decline the request from ${userName}?`)) return;
        answer(declineRequest, 'Request declined.');
    };

    return (
        <div className="bg-white shadow-md rounded-xl p-4 mb-5 w-full max-w-3xl mx-auto">
            <div className="flex items-start gap-4">
                <div className="text-2xl">🔔</div>

                <div className="flex-1">
                    <p className="text-sm text-gray-800 mb-3">
                        <span className="font-semibold">{student?.name || userName}</span> wants to
                        join <span className="font-semibold">{classInfo.title}</span>.
                    </p>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <label className="block text-xs text-gray-500">Username</label>
                            <p className="text-gray-800">{userName}</p>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500">Class</label>
                            <p className="text-gray-800">
                                {classInfo.title} ({classInfo.classId})
                            </p>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500">Email</label>
                            <p className="text-gray-800">{student?.email || '-'}</p>
                        </div>
                        <div>
                            <label className="block text-xs text-gray-500">Contact</label>
                            <p className="text-gray-800">{student?.contact || '-'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={() => answer(approveRequest, 'Student approved.')}
                        disabled={busy}
                        className="bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white text-sm px-4 py-1 rounded"
                    >
                        Approve
                    </button>
                    <button
                        onClick={handleDecline}
                        disabled={busy}
                        className="bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white text-sm px-4 py-1 rounded"
                    >
                        Decline
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationCard;
