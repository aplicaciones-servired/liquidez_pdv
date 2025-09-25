import { Router } from "express";
import { getLiquidez } from "../controllers/liquidez.controller";

export const LiquidazionRoute = Router();

LiquidazionRoute.post('/liquidazion/:zona', getLiquidez);