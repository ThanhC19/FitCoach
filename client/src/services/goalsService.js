import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Required for session cookies
});

export const saveGoal = async ({ goal, availableDays, timeSlots }) => {
  try {
    const response = await API.post("/goals", {
      goal,
      availableDays,
      timeSlots,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};

export const getGoal = async () => {
  try {
    const response = await API.get("/goals");
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};
