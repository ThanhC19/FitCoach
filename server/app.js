import express from "express";
import cors from "cors";
const app = express();
import router from "./router.js"

app.use(cors());
app.use(express.json());
app.use(router);

// last app.use to catch non-existent routes:
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;