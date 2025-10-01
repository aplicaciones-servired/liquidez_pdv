
import VendedoresModel from "../models/vendedores.model";
import Serviciosmodel from "../models/servicios.model";
import { col, fn, literal, Op, where } from "sequelize";
import { Request, Response } from "express";
import HoraModel from "../models/hora.model";

export const getDetalle = async (
  req: Request,
  res: Response
): Promise<void> => {
  const data = req.params;
  const { sucursal } = data;
  try {
    const DetalleLiquidez = await HoraModel.findAll({
      attributes: [
        "FECHA",
        "SUCURSAL",
        [col("Servicio.CATEGORIACOMERCIAL"), "CATEGORIACOMERCIAL"],
        [fn("SUM", col("INGRESOS")), "ING"],
        [fn("SUM", col("EGRESOS")), "EGR"],
      ],
      include: [
        {
          model: VendedoresModel,
          as: "Vendedor",
          attributes: [],
          required: false,
        },
        {
          model: Serviciosmodel,
          as: "Servicio",
          attributes: [],
          required: false,
        },
      ],
      where: {
        [Op.and]: [
          where(col("FECHA"), fn("CURDATE")),
          literal("(INGRESOS OR EGRESOS <> 0)"),
          where(col("HORA"), fn("HOUR", fn("NOW"))),
          { SUCURSAL: sucursal },
        ],
      },
      group: ["FECHA", "SUCURSAL", "Servicio.CATEGORIACOMERCIAL"],
    });
    res.status(200).json({
      success: true,
      detalle: DetalleLiquidez,
      mesagge: "Detalle extraido correctamente",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al obtener el Detalle",
      error,
    });
  }
};
