"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.db_sync = void 0;
const sequelize_1 = require("sequelize");
require('dotenv').config();
console.log('Intentando conectar a:', process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
const db = new sequelize_1.Sequelize("postgres://BIGPIXELUSER:bigpixel2023@postgresdb:5432/BIGPIXELDB");
exports.db = db;
const db_sync = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
});
exports.db_sync = db_sync;
// export default db
