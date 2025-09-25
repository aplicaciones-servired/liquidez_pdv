import { Router } from "express";
import { getLiquidez } from "../controllers/liquidez.controller.js";

export const LiquidazionRoute = Router();

LiquidazionRoute.post('/liquidazion', getLiquidez);