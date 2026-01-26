import User from "./user.js";
import Goal from "./goals.js";
import Calendar from "./calendar.js";

User.hasOne(Goal, {foreignKey:"UID", onDelete: "CASCADE"});
Goal.belongsTo(User,{foreignKey:"UID"})

Goal.hasOne(Calendar, {foreignKey:"GoalID", onDelete: "CASCADE"});
Calendar.belongsTo(Goal,{foreignKey:"GoalID"})

export {User,Goal,Calendar}