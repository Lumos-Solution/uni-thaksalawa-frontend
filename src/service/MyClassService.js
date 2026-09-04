// src/services/MyClassService.js
import api from "../auth/apiClient";

// Classes taught by the given user.
export const getClassesByUsername = async (username) => {
  const response = await api.get(`/api/class/getClasses/${username}`);
  return response.data;
};

// The class fields shared by adding and editing. The image is only appended
// when one was chosen, so an edit without a new file keeps the current picture.
const toFormData = (classData) => {
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

  return formData;
};

const MULTIPART = { headers: { "Content-Type": "multipart/form-data" } };

// Function to add a class
export const addClass = async (classData, username) => {
  const formData = toFormData(classData);
  formData.append("studentIDs", JSON.stringify([]));
  formData.append("teacherID", username);

  const response = await api.post("/api/class/add", formData, MULTIPART);
  return response.data;
};

// Editing is refused by the server once the class start date has passed.
export const updateClass = async (classId, classData) => {
  const response = await api.put(
    `/api/class/update/${classId}`,
    toFormData(classData),
    MULTIPART
  );
  return response.data;
};
