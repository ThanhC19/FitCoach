import { Goal } from "../db.js";

export const getGoalByUserId = async (req, res) => {
  try {
    const uid = req.session?.uid;

    // check if user is authorized
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const goal = await Goal.findOne({
      where: { UID: uid },
      order: [["createdAt", "DESC"]],
    });

    if (!goal) {
      return res.status(200).json(null);
    }

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const saveGoals = async (req, res) => {
  try {
    const uid = req.session?.uid;

    // check if user is authorized
    if (!uid) return res.status(401).json({ message: "Unauthorized" });

    const { goal, availableDays, timeSlots } = req.body;

    // check if all required value are passed
    if (
      !goal ||
      !Array.isArray(availableDays) ||
      availableDays.length === 0 ||
      !Array.isArray(timeSlots) ||
      timeSlots.length === 0
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newGoal = await Goal.create({
      UID: uid,
      Goal: goal,
      AvailableDays: availableDays,
      time_slots: timeSlots,
    });

    return res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
