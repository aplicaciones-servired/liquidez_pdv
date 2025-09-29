import { fn, col, where, Op } from "sequelize";
import LiquidacionModel from "../models/liquidazion.model";
import type { Request, Response } from "express";

export const getLiquidez = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.params;
  const { zona } = data;
  const empresa = zona === "Servired" ? "39628" : "39627";
  try {
    const Liquidez = await LiquidacionModel.findAll({
      attributes: [
        "FECHA",
        "SUCURSAL",
        "ZONA",
        "CCOSTO",
        "SUPERVISOR",
        "NOMBRE",
        "CATEGORIA",
        "CELULA",
        "DISPOSITIVO",
        "UMBRAL_MINIMO",
        "UMBRAL_MAXIMO",
        "HORA",
        "LIQUIDEZ",
        "ESTADO_LIQUIDEZ",
      ],
      where: {
        [Op.and]: [
          where(col("FECHA"), fn("CURDATE")),
          where(col("HORA"), fn("HOUR", fn("NOW"))),
          { ZONA: empresa },
        ],
      },
      order: [["LIQUIDEZ", "DESC"]],
    });

    res.status(200).json({
      success: true,
      datos: Liquidez,
      message: "Datos de liquidez obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener los datos de liquidez",
      error,
    });
  }
};
