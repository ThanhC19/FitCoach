import { DataTypes } from "sequelize";
import userModel from "./user.js";
import goalModel from "./goals.js";
import calendarModel from "./calendar.js";

const initialModels = (sequelize) => {
 
  const User = userModel(sequelize, DataTypes);
  const Goal = goalModel(sequelize, DataTypes);
  const Calendar = calendarModel(sequelize, DataTypes);


  User.hasOne(Goal, { foreignKey: "UID", onDelete: "CASCADE" });
  Goal.belongsTo(User, { foreignKey: "UID" });

  Goal.hasOne(Calendar, { foreignKey: "GoalID", onDelete: "CASCADE" });
  Calendar.belongsTo(Goal, { foreignKey: "GoalID" });

  
  return { User, Goal, Calendar};
};

export  default initialModels;