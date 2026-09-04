// src/services/MyClassService.js
import api from "../auth/apiClient";

// Classes taught by the given user.
export const getClassesByUsername = async (username) => {
  const response = await api.get(`/api/class/getClasses/${username}`);
  return response.data;
};

// Function to add a class
export const addClass = async (classData, username) => {
  const studentIds = [];

  const formData = new FormData();
  formData.append("classType", classData.classType);
  formData.append("title", classData.title);
  formData.append("subject", classData.subject);

  // Only a physical class carries a place; an online one sends neither field.
  if (classData.classType === "physical") {
    formData.append("location", classData.location);
    if (classData.coordinates) {
      formData.append("coordinates", JSON.stringify(classData.coordinates));
    }
  }
  formData.append("date", classData.date);
  formData.append("time", classData.time);
  formData.append("fee", classData.fee);
  if (classData.classImage) {
    formData.append("classImage", classData.classImage);
  }
  formData.append("studentIDs", JSON.stringify(studentIds));
  formData.append("teacherID", username);

  const response = await api.post("/api/class/add", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
