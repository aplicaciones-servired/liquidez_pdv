import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envLiquidez = z.object({
  DB_LIQUIDEZ_USER: z.string().min(1, { message: "El usuario es requerido" }),
  DB_LIQUIDEZ_PASSWORD: z
    .string()
    .min(1, { message: "La contraseña es requerida" }),
  DB_LIQUIDEZ_HOST: z.string().min(1, { message: "El host es requerido" }),
  DB_LIQUIDEZ_PORT: z.string().min(1, { message: "El puerto es requerido" }).transform( (e) => parseInt(e)),
  DB_LIQUIDEZ_DATABASE: z
    .string()
    .min(1, { message: "La base de datos es requerida" }),
});

const { success, data, error } = envLiquidez.safeParse(process.env);

if (!success) {
  console.error(
    "❌ Error en las variables de entorno de Liquidez:",
    error.format()
  );
  throw new Error("Error en las variables de entorno de Liquidez");
}

export const {
  DB_LIQUIDEZ_USER,
  DB_LIQUIDEZ_PASSWORD,
  DB_LIQUIDEZ_HOST,
  DB_LIQUIDEZ_PORT,
  DB_LIQUIDEZ_DATABASE,
} = data;
