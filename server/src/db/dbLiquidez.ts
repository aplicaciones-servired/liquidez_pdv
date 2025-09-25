import {
  DB_LIQUIDEZ_USER,
  DB_LIQUIDEZ_PASSWORD,
  DB_LIQUIDEZ_HOST,
  DB_LIQUIDEZ_PORT,
  DB_LIQUIDEZ_DATABASE,
} from "../config/envLiquidez.js";
import { Sequelize } from "sequelize";

const dbLiquidez = new Sequelize(
  DB_LIQUIDEZ_DATABASE,
  DB_LIQUIDEZ_USER,
  DB_LIQUIDEZ_PASSWORD,
  {
    host: DB_LIQUIDEZ_HOST,
    port: DB_LIQUIDEZ_PORT,
    dialect: "mysql",
    timezone: "-05:00",
  }
);

export default dbLiquidez;
