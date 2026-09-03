import { col, fn, Op, where, literal } from "sequelize";
import type { Request, Response } from "express";
import HoraModel from "../models/hora.model";
import SucursalModel from "../models/sucursales.model";

const empresaPorZona: Record<string, string> = {
  Multired: "39627",
  Servired: "39628",
};

export const getReporte = async (
  req: Request<{ zona: string }>,
  res: Response
): Promise<void> => {
  const { zona } = req.params;
  const { fecha } = req.body as { fecha?: string };
  const empresa = empresaPorZona[zona];

  if (!empresa || !fecha || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    res.status(400).json({
      success: false,
      message: "La empresa y una fecha válida son obligatorias",
    });
    return;
  }

  try {
    const reporte = await HoraModel.findAll({
      attributes: [
        "FECHA",
        [col("Sucursal.TIPO"), "TIPO"],
        "SUCURSAL",
        [col("Sucursal.NOMBRE"), "NOMBRE"],
        [fn("SUM", col("INGRESOS")), "ING"],
        [fn("SUM", col("EGRESOS")), "EGR"],
        [literal("SUM(INGRESOS) + SUM(EGRESOS)"), "BALANCE"],
      ],
      include: [
        {
          model: SucursalModel,
          as: "Sucursal",
          attributes: [],
          required: false,
        },
      ],
      where: {
        [Op.and]: [
          where(col("FECHA"), fecha),
          where(col("HORA"), 22),
          { "$Sucursal.ZONA$": empresa },
        ],
      },
      group: ["FECHA", "SUCURSAL", "Sucursal.TIPO", "Sucursal.NOMBRE"],
      order: [["SUCURSAL", "ASC"]],
    });

    res.status(200).json({
      success: true,
      datos: reporte,
      message: "Reporte obtenido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el reporte",
      error,
    });
  }
};