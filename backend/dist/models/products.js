"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const sequelize_1 = require("sequelize");
class Products extends sequelize_1.Model {
}
Products.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    catetegorias: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    precio: {
        type: sequelize_1.DataTypes.INTEGER,
    }
}, {
    sequelize: database_1.db,
    modelName: 'products', // Nombre de la tabla en la base de datos
});
// Sincroniza el modelo con la base de datos para crear la tabla
// Usuario.sync()
//   .then(() => {
//     console.log('Tabla "users" creada exitosamente');
//   })
//   .catch((error) => {
//     console.error('Error al crear la tabla:', error);
//   });
exports.default = Products;
