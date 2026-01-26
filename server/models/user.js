import {  DataTypes } from "sequelize";
import { sequelize } from "../db.js";


const User = sequelize.define (
    "User", {
    UID:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    username:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    },
    { tableName: "users",timestamps: true}, //table name forces the table to be called 'users' timestamps adds columns created at and updated at 
)

export default User;