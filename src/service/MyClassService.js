// src/services/MyClassService.js
import api from "../auth/apiClient";

// Function to get my classes for a given username
export const getClassesByUsername = async (username) => {
  try {
    const response = await api.get(`/api/classes/getClasses/${username}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my classes:", error);
    throw error;
  }
};
//post
// Function to add a class
export const addClass = async (classData, username) => {
  const studentIds=[];
  try {
    const formData = new FormData();
    formData.append("classType", classData.classType);
    formData.append("title", classData.title);
    formData.append("subject", classData.subject);
    formData.append("location", classData.location);
    formData.append("date", classData.date);
    formData.append("time", classData.time);
    formData.append("fee", classData.fee);
    formData.append("classImage", classData.classImage);
    formData.append("studentIDs",JSON.stringify(studentIds) );
    formData.append("teacherID", username);

    const response = await api.post("/api/class/add", formData, {
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
