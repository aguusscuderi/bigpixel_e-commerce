import { db } from '../config/database';
import { DataTypes, Model } from 'sequelize';

class Usuario extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public root!: string;
  //public picture!: string
}

Usuario.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    }, 
    /*picture: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },*/
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    root: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
  },
  {
    sequelize: db,
    modelName: 'users', // Nombre de la tabla en la base de datos
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

export default Usuario