import { Request, Response } from "express";
import { Op, fn, col, literal, where } from "sequelize";
import LiquidacionModel from "../models/liquidazion.model";

export const TotalLiquidez = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.params;
  const { zona } = data;
  const empresa = zona === "Servired" ? "39628" : "39627";
  try {
    const ToLiquidez = await LiquidacionModel.findAll({
      attributes: [
        "ZONA",
        "ESTADO_LIQUIDEZ",
        [fn("COUNT", fn("DISTINCT", col("SUCURSAL"))), "TOTAL_PDV"],
        [
          literal(`
            ROUND(
              (COUNT(DISTINCT SUCURSAL) * 100.0) / 
              SUM(COUNT(DISTINCT SUCURSAL)) OVER (PARTITION BY ZONA),
              2
            )
          `),
          "PORCENTAJE",
        ],
      ],
      where: {
        FECHA: literal("CURDATE()"),
        ZONA: empresa,
      },
      group: ["ZONA", "ESTADO_LIQUIDEZ"],
      order: ["ZONA", "ESTADO_LIQUIDEZ"],
    });
    res.status(200).json({
      success: true,
      datos: ToLiquidez,
      message: "Datos obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los datos",
      error,
    });
  }
};
