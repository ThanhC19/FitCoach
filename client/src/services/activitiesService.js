import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Required for session cookies
});

export const saveActivities = async (
  GoalID,
  Title,
  Description,
  start,
  end,
) => {
  try {
    const response = await API.post("/activities", {
      GoalID,
      Title,
      Description,
      start,
      end,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};

export const getActivities = async (GoalID) => {
  if (!GoalID) {
    throw new Error("GoalID is required to fetch activities.");
  }
  try {
    const response = await API.get("/activities", { params: { GoalID } });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};

export const getActivitiesByDate = async (GoalID, date) => {
  if (!GoalID) throw new Error("GoalID is required.");
  if (!date) throw new Error("date is required. Use YYYY-MM-DD");

  try {
    const response = await API.get("/activities/day", {
      params: { GoalID, date },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};
