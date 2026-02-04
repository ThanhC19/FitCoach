import { GoogleGenAI } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateActivities = async (Goal, Days, TimeSlot) => {
  try {
    console.log(Goal);
    console.log(Days);
    console.log(TimeSlot);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",

      config: {
        responseMimeType: "application/json",
      },

      contents: `
      Act as a professional fitness coach and scheduler.
      Generate a workout plan based on these parameters:
      - Goal: ${Goal}
      - Days per week: ${Days}
      - Available Timeslot per day: ${TimeSlot}

      Return a JSON array of objects. Each object represents a single workout session.
      Strictly follow this schema:
      {
        "Title": "Short exercise name",
        "Description": "Max 15 words instruction",
        "start": "ISO 8601 format string",
        "end": "ISO 8601 format string"
      }

      Constraints:
      1. Only return the JSON array. No conversational text.
      2. Distribute the ${Days} sessions logically across a standard week starting from Monday.
      3. Match the time range specified in "${TimeSlot}".
      4. Ensure descriptions are concise for mobile calendar views.
    `,
    });

    // TODO check text nesting
    console.log("hello world");
    const responseText = JSON.parse(response.text);

    return responseText;
  } catch (error) {
    throw error.response?.data?.message || "Server Error";
  }
};
