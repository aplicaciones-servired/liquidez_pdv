import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import dbLiquidez from "../db/dbLiquidez";

class Serviciosmodel extends Model<
  InferAttributes<Serviciosmodel>,
  InferCreationAttributes<Serviciosmodel>
> {
  declare CODIGO: String;
  declare NOMBRE: String;
  declare CATEGORIA: String;
  declare VERSION: String;
  declare CATEGORIACOMERCIAL: String;
  declare IVA: number;
  declare EXPLOTACION: number;
}

Serviciosmodel.init(
  {
    CODIGO: { type: DataTypes.STRING(10) },
    NOMBRE: { type: DataTypes.STRING(60) },
    CATEGORIA: { type: DataTypes.STRING(40) },
    VERSION: { type: DataTypes.STRING(20) },
    CATEGORIACOMERCIAL: { type: DataTypes.STRING(20) },
    IVA: { type: DataTypes.FLOAT(5, 2) },
    EXPLOTACION: { type: DataTypes.FLOAT(5, 2) },
  },
  {
    sequelize: dbLiquidez,
    modelName: "Serviciosmodel",
    tableName: "SERVICIOS",
    timestamps: false,
  }
);

export default Serviciosmodel
