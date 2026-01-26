import 'dotenv/config' 
import app from "./app.js";
import { connectDB} from "./db.js";
import  './models/user.js';
import User from './models/user.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 3033;
await connectDB();


const user = await User.findAll();
console.log(user);



app.listen(PORT, () => {
  console.log(`App Running on Port ${PORT}`);
});
