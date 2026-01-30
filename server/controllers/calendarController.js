import { Calendar, Goal } from "../db.js";
import { Op } from "sequelize";

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
    const overlapping = await Calendar.findOne({
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





    const newActivity = await Calendar.create({ GoalID, Title, start, end })
    return res.status(201).json(newActivity);

  } catch (err) {
    console.error("postActivity error: ", err);
    return res.status(500).json({ message: "Failed to post the event" })
  }
}