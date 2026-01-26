import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

const GOAL_TYPES = [ "LOSE_WEIGHT", "GAIN_MUSCLE", "GET_STRONGER", "IMPROVE_FITNESS"]
const DAYS = ["MON","TUE","WED","THU","FRI","SAT", "SUN"]

const Goal = sequelize.define(
    "Goal",{
     GoalID: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
     UID:{type:DataTypes.INTEGER, allowNull: false},
     Goal: {type:DataTypes.ENUM(...GOAL_TYPES), allowNull:false},
     AvailableDays: {type: DataTypes.ARRAY(DataTypes.ENUM(...DAYS)), allowNull:false, defaultValue:[]}, //Array of Enums
     // example [{start:"9:00", end:"10:00"},{start:"9:00", end:"15:00"}] AI code
     time_slots: {type:DataTypes.JSONB,allowNull:false,defaultValue:[]}
    },
    {tableName:"goals", timestamps:true}
)

export default Goal;