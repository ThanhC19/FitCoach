import { DataTypes } from "sequelize";
import userModel from "./user.js";
import goalModel from "./goals.js";
import ActivitiesModel from "./activities.js";

const startingModels = (sequelize) => {

  const User = userModel(sequelize, DataTypes);
  const Goal = goalModel(sequelize, DataTypes);
  const Activities = ActivitiesModel(sequelize, DataTypes);


  User.hasOne(Goal, { foreignKey: "UID", onDelete: "CASCADE" });
  Goal.belongsTo(User, { foreignKey: "UID" });

  Goal.hasMany(Activities, { foreignKey: "GoalID", onDelete: "CASCADE" });
  Activities.belongsTo(Goal, { foreignKey: "GoalID" });


  return { User, Goal, Activities };
};

export default startingModels;
