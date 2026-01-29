import express from "express";
import cors from "cors";
const app = express();
import router from "./router.js"
import session from "express-session";

app.use(cors());
app.use(express.json());
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false, //prevent save session if it wasn't modified
  saveUninitialized:false,
  cookie:{
    httpOnly:true, //prevents client side script
    secure:false, 
    maxAge:1000*60*60 //1hour 
  }
}))


app.use(router);
// last app.use to catch non-existent routes:
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

export default app;