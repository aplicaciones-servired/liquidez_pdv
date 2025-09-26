import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import dbLiquidez from "../db/dbLiquidez";
import SucursalModel from "./sucursales.model";

class HoraModel extends Model<
  InferAttributes<HoraModel>,
  InferCreationAttributes<HoraModel>
> {
  declare FECHA: Date;
  declare SUCURSAL: string;
  declare PERSONA: string;
  declare SERVICIO: string;
  declare HORA: number;
  declare INGRESOS: number;
  declare TRN_INGRESOS: number;
  declare EGRESOS: number;
  declare TRN_EGRESOS: number;
  declare COMISION: number;
  declare FECHACREATE: Date;
  declare FECHAUPDATE: Date;
  declare VERSION: string;
}

HoraModel.init(
  {
    FECHA: { type: DataTypes.DATEONLY, allowNull: false },
    SUCURSAL: { type: DataTypes.STRING(10), allowNull: true },
    PERSONA: { type: DataTypes.STRING(10), allowNull: true },
    SERVICIO: { type: DataTypes.STRING(20), allowNull: true },
    HORA: { type: DataTypes.INTEGER, allowNull: false },
    INGRESOS: { type: DataTypes.INTEGER, allowNull: true },
    TRN_INGRESOS: { type: DataTypes.INTEGER, allowNull: true },
    EGRESOS: { type: DataTypes.INTEGER, allowNull: true },
    TRN_EGRESOS: { type: DataTypes.STRING, allowNull: true },
    COMISION: { type: DataTypes.INTEGER, allowNull: true },
    FECHACREATE: { type: DataTypes.DATEONLY, allowNull: true },
    FECHAUPDATE: { type: DataTypes.DATEONLY, allowNull: true },
    VERSION: { type: DataTypes.STRING(18), allowNull: false },
  },
  {
    sequelize: dbLiquidez,
    modelName: "HoraModel",
    tableName: "MONITOREOLIQUIDEZ_PDV",
    timestamps: false,
  }
);

HoraModel.belongsTo(SucursalModel, {
  foreignKey: "SUCURSAL",
  targetKey: "CODIGO",
  as: "Sucursal",
});

export default HoraModel;
