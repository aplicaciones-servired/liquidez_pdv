import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import dbLiquidez from "../db/dbLiquidez";

class VendedoresModel extends Model<
  InferAttributes<VendedoresModel>,
  InferCreationAttributes<VendedoresModel>
> {
  declare DOCUMENTO: string;
  declare NOMBRES: string;
  declare GRPVTAS_CODIGO: string;
  declare CARGO: string;
  declare VERSION: string;
  declare NOMBRECARGO: string;
  declare CCOSTO: string;
}

VendedoresModel.init(
  {
    DOCUMENTO: { type: DataTypes.STRING(20) },
    NOMBRES: { type: DataTypes.STRING(60) },
    GRPVTAS_CODIGO: { type: DataTypes.STRING(30) },
    CARGO: { type: DataTypes.STRING(30) },
    VERSION: { type: DataTypes.STRING(20) },
    NOMBRECARGO: { type: DataTypes.STRING(30) },
    CCOSTO: { type: DataTypes.STRING(10) },
  },
  {
    sequelize: dbLiquidez,
    modelName: "VendedoresModel",
    tableName: "VENDEDORES",
    timestamps: false,
  }
);


export default VendedoresModel