import express from "express";
import { login, registerUser } from "./controllers/userController.js";
import { saveGoals } from "./controllers/goalsController.js";
import { getActivities, postActivity } from "./controllers/activitiesController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/goals", saveGoals);
router.get("/activities", getActivities);
router.post("/activities",postActivity);

export default router;
