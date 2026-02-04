import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_API_KEY;

//Changed mock data for testing purposes
const mockData = [
  {
   Title: "Morning Workout",
    Description: "A light cardio and stretching session to start the day energized.",
    start: "2026-03-04T07:30:00Z",
    end: "2026-03-04T08:15:00Z"
  },
  {
    Title: "Team Sync Meeting",
    Description: "Weekly stand-up with the development team to review tasks and blockers.",
    start: "2026-03-05T09:00:00Z",
    end: "2026-03-05T09:30:00Z"
  },
  {
    Title: "Lunch With Client",
    Description: "Discussing project goals and deliverables in a casual lunch setting.",
    start: "2026-03-06T12:00:00Z",
    end: "2026-03-06T13:00:00Z"
  },
  {
   Title: "Evening Study Session",
    Description: "Focused time for reading and practicing JavaScript concepts.",
    start: "2026-03-06T18:30:00Z",
    end: "2026-03-06T20:00:00Z"
  }
];

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateActivities = async (Goal, Days, TimeSlot) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // TODO we need a very nice prompt
      contents: 'Respond with exactly "Hello"',
    });

    // TODO check text nesting
    return mockData;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};
