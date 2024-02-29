import { db } from '../config/database';
import { DataTypes, Model } from 'sequelize';

class Products extends Model {
  public id!: number;
  public nombre!: string;
  public categorias!: string;
  public precio!: string;
}

Products.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorias: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    precio: {
        type: DataTypes.INTEGER,
      }
  },
  {
    sequelize: db,
    modelName: 'products', // Nombre de la tabla en la base de datos
  }
);

export default Products