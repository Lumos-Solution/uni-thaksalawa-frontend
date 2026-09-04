import React from 'react';
import { API_BASE_URL } from '../auth/apiClient';

// Uploaded images are stored as bare filenames; anything already absolute is
// left alone so seeded/remote images keep working.
const imageUrl = (classImage) => {
    if (!classImage) return '';
    return /^https?:\/\//.test(classImage)
        ? classImage
        : `${API_BASE_URL}/uploads/classImages/${classImage}`;
};

// What the button says once the student already has a row for this class, so a
// second request cannot be sent by mistake.
const JOIN_STATUS_LABEL = {
    approved: 'Already Joined',
    pending: 'Request Pending',
};

const ClassCard = ({ classData, onEnroll, distanceKm, joinStatus, isOwnClass }) => {
    const { title, subject, teacherName, classImage, classType, location, date, time, fee } =
        classData;

    const image = imageUrl(classImage);

    // A teacher browsing the class list still sees their own classes, but they
    // are not something to join.
    const disabled = isOwnClass || Boolean(joinStatus);

    return (
        <div className="bg-white p-4 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {image && (
                <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-4" />
            )}

            <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-semibold">{title}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800 capitalize">
                    {classType}
                </span>
            </div>

            <p className="text-sm text-gray-600">{subject}</p>
            {teacherName && <p className="text-sm text-gray-600">&#128100; {teacherName}</p>}
            {location && <p className="text-sm text-gray-600">&#128205; {location}</p>}
            {typeof distanceKm === 'number' && (
                <p className="text-sm font-medium text-emerald-700">
                    ~{distanceKm.toFixed(1)} km away
                </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
                {date} &middot; {time}
            </p>
            <p className="text-sm text-gray-700 font-medium">Fee: Rs. {fee}</p>

            <button
                onClick={() => onEnroll(classData)}
                disabled={disabled}
                className={`mt-4 px-4 py-2 rounded text-white ${
                    disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
                {isOwnClass
                    ? 'You Created'
                    : JOIN_STATUS_LABEL[joinStatus] || 'Request to Join'}
            </button>
        </div>
    );
};

export default ClassCard;
