import express from 'express';
import { User } from "./db.js";

const router = express.Router();

// test route
router.get("/users/test", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB error" });
  }
});

export default router;