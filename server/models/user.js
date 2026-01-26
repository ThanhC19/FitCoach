import {  DataTypes } from "sequelize";
import { sequelize } from "../db";


const User = sequelize.define (
    "User", {
    UID:{type:DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    username:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false}
    }
)

export default User;