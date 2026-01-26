import { Sequelize } from "sequelize";


export const sequelize = new Sequelize(
  'fitcoach',
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    //Create a .env and add your postgres credientials
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
}
);

// const mod = await import("./models/user.js"); 
// const defineModel = mod.default;   
// const model = defineModel(sequelize, Sequelize.DataTypes);
// db[model.name] = model;

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        await import ("./models/index.js")
        await sequelize.sync({alter:true});
        console.log("Connection has been established successfully")
    } catch (err) {
        console.log("DB connection failed",err)
    }
}
