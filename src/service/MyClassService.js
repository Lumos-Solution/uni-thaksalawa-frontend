// src/services/MyClassService.js
import axios from "axios";

const api = axios.create({baseURL:"http://localhost:3000/api"});

// Function to get my classes for a given username
export const getClassesByUsername = async (username) => {
  try {
    const response = await api.get(`/classes/getClasses/${username}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my classes:", error);
    throw error;
  }
};
//post
// Function to add a class
export const addClass = async (classData, username) => {
  try {
    const formData = new FormData();
    formData.append("classType", classData.classType);
    formData.append("title", classData.title);
    formData.append("subject", classData.subject);
    formData.append("location", classData.location);
    formData.append("date", classData.date);
    formData.append("time", classData.time);
    formData.append("fee", classData.fee);
    formData.append("image", classData.image);
    formData.append("username", username);

    const response = await api.post("/classes/addClass", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to add class:", error);
    throw error;
  }
};
