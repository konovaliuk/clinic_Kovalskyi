import { DataSource } from "typeorm";
import "dotenv/config.js";
import { User } from "./Entities/daoEntities/User.js";
import { Appointment } from "./Entities/daoEntities/Appointment.js";
import { Doctor } from "./Entities/daoEntities/Doctor.js";
const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.databaseHost,
  port: 3306,
  username: process.env.databaseUser,
  password: process.env.databasePassword,
  database: process.env.databaseName,
  entities: ["src/Entities/daoEntities/*.ts"],
});

await AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => console.log(err));

export { AppDataSource };
