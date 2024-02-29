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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: 'products', // Nombre de la tabla en la base de datos
  }
);

export default Products