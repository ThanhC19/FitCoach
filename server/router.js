import express from "express";
import { login, logout, registerUser } from "./controllers/userController.js";
import { saveGoals, getGoalByUserId } from "./controllers/goalsController.js";
import {
  getActivities,
  postActivity,
  getTodaysActivities,
  getActivitiesByDate,
} from "./controllers/activitiesController.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/goals", saveGoals);
router.get("/goals", getGoalByUserId);
router.get("/activities", getActivities);
router.get("/activities/day", getActivitiesByDate);
router.post("/activities", postActivity);
router.get("/today", getTodaysActivities);
router.post("/logout", logout);

export default router;
