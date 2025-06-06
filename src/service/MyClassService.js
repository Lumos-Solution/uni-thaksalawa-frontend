import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/classes';

export const addClass = async (formData) => {
  try {
    const data = new FormData();

    // Append all fields to FormData
    data.append('classType', formData.classType);
    data.append('title', formData.title);
    data.append('subject', formData.subject);
    data.append('location', formData.location);
    data.append('date', formData.date);
    data.append('time', formData.time);
    data.append('fee', formData.fee);
    
    if (formData.image) {
      data.append('image', formData.image);
    }

    const response = await axios.post(`${BASE_URL}/add`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error adding class:', error);
    throw error;
  }
};
