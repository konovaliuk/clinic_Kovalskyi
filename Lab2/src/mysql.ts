import mysql from "mysql2";
import "dotenv/config.js";

const mysqlconnectionsPool = mysql.createPool({
  host: process.env.databaseHost,
  user: process.env.databaseUser,
  password: process.env.databasePassword,
  database: process.env.databaseName,
});

export { mysqlconnectionsPool };
