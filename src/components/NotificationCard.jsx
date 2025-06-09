import React from 'react';
import { transferStudent, deleteNotification } from "../service/NotificationService.js";

function NotificationCard({ index, classId, title, userName, setNotifications, notifications }) {

    async function considerRequest() {
        try {
            const result = await transferStudent(userName, classId);
            if (result.message === 'success') {
                alert('Student transferred successfully.');
                setNotifications(prev =>
                    prev.filter(
                        note =>
                            !(
                                note.request.userName === userName &&
                                note.classInfo.classId === classId
                            )
                    )
                );
            } else {
                alert('Transfer failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Error during transfer.');
        }
    }

    async function handleDelete() {
        const confirmed = window.confirm(`Delete request for ${userName} in class ${classId}?`);
        if (!confirmed) return;

        try {
            const result = await deleteNotification(userName, classId);
            if (result.message === 'success') {
                alert('Data is deleted.');
                setNotifications(prev =>
                    prev.filter(
                        note =>
                            !(
                                note.request.userName === userName &&
                                note.classInfo.classId === classId
                            )
                    )
                );
            } else {
                alert('Deletion failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Error during deletion.');
        }
    }

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
                    <button onClick={considerRequest} className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded">
                        Consider
                    </button>
                    <button onClick={handleDelete} className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationCard;
