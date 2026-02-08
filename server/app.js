import express from "express";
import cors from "cors";
const app = express();
import router from "./router.js"
import session from "express-session";

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true // for the cookies
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'a_back_up_test_secret',
  resave: false, // prevent save session if it wasn't modified
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // prevents client side script
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 30 // 1month
  }
}))


app.use(router);
// last app.use to catch non-existent routes:
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;