import {
  DataTypes,
  Model,
  type InferAttributes,
  type InferCreationAttributes,
} from "sequelize";
import dbLiquidez from "../db/dbLiquidez";

class SucursalModel extends Model<
  InferAttributes<SucursalModel>,
  InferCreationAttributes<SucursalModel>
> {
  declare ZONA: string;
  declare CCOSTO: string;
  declare CODIGO: string; // PK
  declare NOMBRE: string | null;
  declare DIRECCION: string | null;
  declare TIPO: string | null;
  declare DISPOSITIVO: string | null;
  declare SUPERVISOR: string | null;
  declare CANAL: string | null;
  declare CATEGORIA: string | null;
  declare HORA_ENTRADA: string | null; // time
  declare HORA_SALIDA: string | null;
  declare HORA_ENTRADA_FES: string | null;
  declare HORA_SALIDA_FES: string | null;
  declare SUBZONA: string | null;
  declare CELULA: string | null;
  declare HORAS_ORDINARIAS: number | null;
  declare HORAS_FESTIVAS: number | null;
  declare ESTADO: string | null;
}

SucursalModel.init(
  {
    ZONA: { type: DataTypes.STRING(10), allowNull: false },
    CCOSTO: { type: DataTypes.STRING(10), allowNull: false },
    CODIGO: { type: DataTypes.STRING(10), allowNull: false, primaryKey: true },
    NOMBRE: { type: DataTypes.STRING(40), allowNull: true },
    DIRECCION: { type: DataTypes.STRING(40), allowNull: true },
    TIPO: { type: DataTypes.STRING(20), allowNull: true },
    DISPOSITIVO: { type: DataTypes.STRING(20), allowNull: true },
    SUPERVISOR: { type: DataTypes.STRING(20), allowNull: true },
    CANAL: { type: DataTypes.STRING(30), allowNull: true },
    CATEGORIA: { type: DataTypes.STRING(30), allowNull: true },
    HORA_ENTRADA: { type: DataTypes.TIME, allowNull: true },
    HORA_SALIDA: { type: DataTypes.TIME, allowNull: true },
    HORA_ENTRADA_FES: { type: DataTypes.TIME, allowNull: true },
    HORA_SALIDA_FES: { type: DataTypes.TIME, allowNull: true },
    SUBZONA: { type: DataTypes.STRING(30), allowNull: true },
    CELULA: { type: DataTypes.STRING(30), allowNull: true },
    HORAS_ORDINARIAS: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 8 },
    HORAS_FESTIVAS: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 6 },
    ESTADO: { type: DataTypes.STRING(5), allowNull: true, defaultValue: "A" },
  },
  {
    sequelize: dbLiquidez,
    modelName: "SucursalModel",
    tableName: "SUCURSALES",
    timestamps: false,
  }
);

export default SucursalModel;
