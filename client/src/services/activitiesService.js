import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Required for session cookies
});

export const saveActivities = async ({
  GoalID,
  Title,
  Description,
  start,
  end,
}) => {
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
