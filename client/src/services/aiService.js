import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_API_KEY;

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateActivities = async (Goal, Days, TimeSlot) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // TODO we need a very nice prompt
      contents: 'Respond with exactly "Hello"',
    });

    // TODO check text nesting
    return response.text;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};
