import { Router } from "express";
import { getLiquidez } from "../controllers/liquidez.controller";
import { TotalLiquidez } from "../controllers/totalLiquidez.controller";
import { getHora } from "../controllers/hora.controller";
import { getDetalle } from "../controllers/detalle.controller";
import { getReporte } from "../controllers/reporte.controller";

export const LiquidazionRoute = Router();

LiquidazionRoute.post('/liquidazion/:zona', getLiquidez);

LiquidazionRoute.get('/Horaliquidez', getHora);

LiquidazionRoute.post('/Totalliquidez/:zona', TotalLiquidez);

LiquidazionRoute.post('/Totalliquidez/:zona', TotalLiquidez);

LiquidazionRoute.post('/Detalleliquidez/:sucursal', getDetalle);

LiquidazionRoute.post('/Reporte/:zona', getReporte);