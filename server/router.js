import express from "express";
import { login, registerUser } from "./controllers/userController.js";
import { saveGoals } from "./controllers/goalsController.js";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/goals", saveGoals);

export default router;
