// src/components/ClassCard.jsx

import React from 'react';

const ClassCard = ({ classData, onEnroll }) => {
  const { title, description, teacher, image, id } = classData;

  return (
    <div className="bg-white p-4 rounded shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img src={image} alt={title} className="w-full h-40 object-cover rounded mb-4" />
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm text-gray-600">{teacher}</p>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
      <button
        onClick={() => onEnroll(id)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Enroll
      </button>
    </div>
  );
};

export default ClassCard;
