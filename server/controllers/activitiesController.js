import { Activities, Goal } from "../db.js";
import { Op } from "sequelize";

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
    const activities = await Activities.findAll({
      where: { GoalID: GoalID }, // Searching by Foreign Key
      order: [["start", "ASC"]],
    });

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


export const postActivity = async (req, res) => {
  try {

    const { GoalID, Title, start, end } = req.body;

    //check that all fields are filled:
    if (!GoalID || !Title || !start || !end) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    //check if the goal exists:
    const goalExists = await Goal.findByPk(GoalID);
    if (!goalExists) {
      return res.status(404).json({ message: "Goal not found." });
    }

    //check that the starttime is before endtime:
    if (new Date(start) >= new Date(end)) {
      return res.status(400).json({ message: "Start time must be before end time." });
    }

    // check that there's not already another activity booked in that timeslot. using Sequelize Operators
    const overlapping = await Activities.findOne({
      where: {
        GoalID,
        [Op.or]: [ // start OR end:
          { start: { [Op.between]: [start, end] } }, // between start and end
          { end: { [Op.between]: [start, end] } }, // between start and end
        ]
      }
    });

    if (overlapping) {
      return res.status(409).json({ message: "This activity overlaps with an existing one." });
    }





    const newActivity = await Activities.create({ GoalID, Title, start, end })
    return res.status(201).json(newActivity);

  } catch (err) {
    console.error("postActivity error: ", err);
    return res.status(500).json({ message: "Failed to post the event" })
  }
}


export const getTodaysActivities = async (req, res) => {
  try {
    const { GoalID } = req.query;

    if (!GoalID) {
      return res.status(400).json({ message: "GoalID is required." });
    }

    // Define the time range for the current day (local time)
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // Find activities where the 'start' date falls within today's range
    const activities = await Activities.findAll({
      where: {
        GoalID: GoalID,
        start: {
          [Op.between]: [startOfToday, endOfToday],
        },
      },
      order: [["start", "ASC"]],
    });

    return res.status(200).json(activities);
  } catch (error) {
    console.error("getTodaysActivities error: ", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};