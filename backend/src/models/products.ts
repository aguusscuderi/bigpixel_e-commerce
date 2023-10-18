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
    catetegorias: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

// Sincroniza el modelo con la base de datos para crear la tabla
// Usuario.sync()
//   .then(() => {
//     console.log('Tabla "users" creada exitosamente');
//   })
//   .catch((error) => {
//     console.error('Error al crear la tabla:', error);
//   });

export default Products