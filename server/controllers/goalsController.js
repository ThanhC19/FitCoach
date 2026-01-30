import { Goal } from "../db.js";

export const getAllGoals = async (req, res) => {
    try {
        const goals = await Goal.findAll();
        res.status(200).json(goals);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

export const getGoalByUserId = async (req, res) => {
    try {
        const { uid } = req.params;
        const goal = await Goal.findOne({
            where: { UID: uid }
        });

        if (!goal) {
            return res.status(404).json({ message: "Goal not found for this user" });
        }

        res.status(200).json(goal);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};