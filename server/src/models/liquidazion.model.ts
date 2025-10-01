import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import dbLiquidez from "../db/dbLiquidez";

class LiquidacionModel extends Model<
  InferAttributes<LiquidacionModel>,
  InferCreationAttributes<LiquidacionModel>
> {
  declare FECHA: Date;
  declare ZONA: string;
  declare CCOSTO: string;
  declare SUPERVISOR: string;
  declare SUCURSAL: string;
  declare NOMBRE: string;
  declare CATEGORIA: string;
  declare CELULA: string;
  declare DISPOSITIVO: string;
  declare UMBRAL_MINIMO: number;
  declare UMBRAL_MAXIMO: number;
  declare HORA: number;
  declare LIQUIDEZ: number;
  declare ESTADO_LIQUIDEZ: string;
}

LiquidacionModel.init(
  {
    FECHA: { type: DataTypes.DATEONLY, allowNull: false },
    ZONA: { type: DataTypes.STRING(10), allowNull: true },
    CCOSTO: { type: DataTypes.STRING(10), allowNull: true },
    SUPERVISOR: { type: DataTypes.STRING(20), allowNull: true },
    SUCURSAL: { type: DataTypes.STRING(15), allowNull: false },
    NOMBRE: { type: DataTypes.STRING(40), allowNull: true },
    CATEGORIA: { type: DataTypes.STRING(30), allowNull: true },
    CELULA: { type: DataTypes.STRING(30), allowNull: true },
    DISPOSITIVO: { type: DataTypes.STRING(20), allowNull: true },
    UMBRAL_MINIMO: { type: DataTypes.INTEGER, allowNull: true },
    UMBRAL_MAXIMO: { type: DataTypes.INTEGER, allowNull: true },
    HORA: { type: DataTypes.INTEGER, allowNull: false },
    LIQUIDEZ: { type: DataTypes.DECIMAL(33, 0), allowNull: true },
    ESTADO_LIQUIDEZ: { type: DataTypes.STRING(18), allowNull: false },
  },
  {
    sequelize: dbLiquidez,
    modelName: "LiquidacionModel",
    tableName: "V_MONITOREO_LIQUIDEZ",
    timestamps: false,
  }
);



export default LiquidacionModel;
