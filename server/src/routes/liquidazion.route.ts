import { Router } from "express";
import { getLiquidez } from "../controllers/liquidez.controller";
import { getHora } from "../controllers/hora.controller";

export const LiquidazionRoute = Router();

LiquidazionRoute.post('/liquidazion/:zona', getLiquidez);

LiquidazionRoute.get('/Horaliquidez', getHora);