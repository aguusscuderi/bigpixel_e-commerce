import { db } from '../config/database';

import { DataTypes, Model, Sequelize } from 'sequelize';

class Usuario extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
}

Usuario.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: db,
    modelName: 'users', // Nombre de la tabla en la base de datos
  }
);

// Sincroniza el modelo con la base de datos para crear la tabla
Usuario.sync()
  .then(() => {
    console.log('Tabla "users" creada exitosamente');
  })
  .catch((error) => {
    console.error('Error al crear la tabla:', error);
  });

export default Usuario