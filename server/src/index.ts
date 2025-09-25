import { PORT } from "./config.js";

import express from "express";
import log from "morgan";
import cors from "cors";
import { LiquidazionRoute } from "./routes/liquidazion.route";
import dotenv from "dotenv";
import corsMiddleware from "./config/corLiquidez.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(log("dev"));
app.use(corsMiddleware);
app.use(LiquidazionRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
