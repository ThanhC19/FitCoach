import { DataTypes } from "sequelize";
import { sequelize} from "../db.js";

const Calendar = sequelize.define(
    "Calendar", {
    Calendar_ID: {type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    GoalID:{type:DataTypes.INTEGER,allowNull:false},
    Title: {type:DataTypes.STRING, allowNull:false},
    start:{type:DataTypes.DATE, allowNull:false},
    end:{type:DataTypes.DATE,allowNull:false},
    },
    {tableName:"calendar", timestamps:true},
)

export default Calendar;