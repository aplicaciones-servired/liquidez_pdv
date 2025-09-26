import { Request, Response } from "express";
import { Op, fn, col, literal } from "sequelize";
import HoraModel from "../models/hora.model";
import SucursalModel from "../models/sucursales.model";

export const getHora = async (req: Request, res: Response): Promise<void> => {
  try {
    const HoraLiquidez = await HoraModel.findAll({
      attributes: [
        [col("Sucursal.ZONA"), "zona"],
        [fn("MAX", col("HoraModel.FECHAUPDATE")), "ultima_fecha"],
      ],
      include: [
        {
          model: SucursalModel,
          as: "Sucursal", // 👈 importante si definiste un alias en la asociación
          attributes: [],
          required: false,
        },
      ],
      where: {
        FECHA: literal("CURDATE()"),
        "$Sucursal.ZONA$": { [Op.in]: [39627, 39628] },
      },
      group: ["Sucursal.ZONA"],
      raw: true,
    });

    res.status(200).json({
      success: true,
      datos: HoraLiquidez,
      message: "Hora de liquidez obtenidos correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener La Hora de liquidez",
      error,
    });
  }
};
