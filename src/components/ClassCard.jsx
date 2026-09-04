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

const ClassCard = ({ classData, onEnroll, distanceKm }) => {
    const { title, subject, teacherName, classImage, classType, location, date, time, fee } =
        classData;

    const image = imageUrl(classImage);

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
            {teacherName && <p className="text-sm text-gray-600">👤 {teacherName}</p>}
            {location && <p className="text-sm text-gray-600">📍 {location}</p>}
            {typeof distanceKm === 'number' && (
                <p className="text-sm font-medium text-emerald-700">
                    ~{distanceKm.toFixed(1)} km away
                </p>
            )}
            <p className="text-sm text-gray-500 mt-2">
                {date} · {time}
            </p>
            <p className="text-sm text-gray-700 font-medium">Fee: Rs. {fee}</p>

            <button
                onClick={() => onEnroll(classData)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Request to Join
            </button>
        </div>
    );
};

export default ClassCard;
