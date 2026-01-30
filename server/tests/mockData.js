// Fixed dates for deterministic tests
const BASE_DATE = new Date("2025-01-01T09:00:00.000Z");

const addDays = (date, days) => new Date(date.getTime() + days * 24 * 60 * 60 * 1000);

// ---- USERS ---------------------------------------------------------

export const mockUsers = [
  {
    UID: 1,
    username: "alice",
    password: "hashed_password_alice", // use real hashed pw in integration tests
  },
  {
    UID: 2,
    username: "bob",
    password: "hashed_password_bob",
  },
  {
    UID: 3,
    username: "charlie",
    password: "hashed_password_charlie",
  },
];

// ---- GOALS ---------------------------------------------------------
// GOAL_TYPES = ["LOSE_WEIGHT", "GAIN_MUSCLE", "GET_STRONGER", "IMPROVE_FITNESS"]
// DAYS       = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

export const mockGoals = [
  {
    GoalID: 1,
    UID: 1, // alice
    Goal: "LOSE_WEIGHT",
    AvailableDays: ["MON", "WED", "FRI"],
    // example: [{start:"9:00", end:"10:00"},{start:"9:00", end:"15:00"}]
    time_slots: [
      { start: "06:30", end: "07:30" },
      { start: "18:00", end: "19:00" },
    ],
  },
  {
    GoalID: 2,
    UID: 2, // bob
    Goal: "GAIN_MUSCLE",
    AvailableDays: ["TUE", "THU", "SAT"],
    time_slots: [
      { start: "09:00", end: "10:30" },
      { start: "16:00", end: "18:00" },
    ],
  },
  {
    GoalID: 3,
    UID: 3, // charlie
    Goal: "IMPROVE_FITNESS",
    AvailableDays: ["MON", "TUE", "WED", "THU", "FRI"],
    time_slots: [
      { start: "07:00", end: "07:45" },
      { start: "12:00", end: "12:30" },
    ],
  },
];

// ---- CALENDAR EVENTS -----------------------------------------------
// One Calendar entry per Goal (Goal.hasOne(Calendar))

export const mockCalendars = [
  {
    Calendar_ID: 1,
    GoalID: 1, // alice's weight loss goal
    Title: "Morning cardio session",
    start: BASE_DATE, // 2025-01-01T09:00:00.000Z
    end: addDays(BASE_DATE, 0.5), // same day, later (roughly 12h later)
  },
  {
    Calendar_ID: 2,
    GoalID: 2, // bob's muscle gain goal
    Title: "Upper body strength workout",
    start: addDays(BASE_DATE, 1), // next day
    end: addDays(BASE_DATE, 1.5),
  },
  {
    Calendar_ID: 3,
    GoalID: 3, // charlie's fitness goal
    Title: "Lunchtime HIIT",
    start: addDays(BASE_DATE, 2),
    end: addDays(BASE_DATE, 2.25),
  },
];