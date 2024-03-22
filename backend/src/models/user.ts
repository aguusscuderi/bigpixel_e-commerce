import { db } from '../config/database';
import { DataTypes, Model } from 'sequelize';

class Usuario extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: string;
  public source!: string;
  public verified!: boolean;
  public root!: string;
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
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: 'direct'
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

export default Usuario