import { Calendar, Goal } from "../db.js";



















































export const getActivities = async (req, res) => {
  try {
    const { GoalID } = req.query;

    if (!GoalID) {
      return res.status(400).json({ message: "GoalID is required." });
    }

    // Since GoalID is a Foreign Key in the Calendar table,
    // we first check if that Goal actually exists in the Goal table.
    const goal = await Goal.findByPk(GoalID);
    
    if (!goal) {
      // If the Foreign Key refers to a non-existent Goal
      return res.status(404).json({ message: "Goal not found." });
    }

    // Now we find all activities matching that Foreign Key
    const activities = await Calendar.findAll({
      where: { GoalID: GoalID }, // Searching by Foreign Key
      order: [["start", "ASC"]],
    });

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};