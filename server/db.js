import { Sequelize } from "sequelize";
import startingModels from "./models/index.js";

// creating sequelize instance:
export const sequelize = new Sequelize(
  "fitcoach",
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    //Create a .env and add your postgres credientials
    host: "localhost",
    dialect: "postgres",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorsAliases: false,
  }
);


// initialize models
const models = startingModels(sequelize);

export const User = models.User;
export const Goal = models.Goal;
export const Calendar = models.Calendar;

//export connect DB function:
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (err) {
    console.log("DB connection failed", err);
    throw err;
  }
};
