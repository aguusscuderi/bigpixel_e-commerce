"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config();
const app = (0, express_1.default)();
const database_1 = require("./config/database");
const user_1 = __importDefault(require("./models/user"));
const index_1 = __importDefault(require("./routes/index"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const { Server: HttpServer } = require('http');
const server = new HttpServer(app);
(0, index_1.default)(app);
(0, database_1.authenticate)()
    .then(() => {
    // Sincroniza el modelo Usuario con la base de datos
    return user_1.default.sync();
})
    .then(() => {
    console.log('Tabla "users" creada o sincronizada exitosamente');
})
    .catch((error) => {
    console.error('Error al sincronizar o crear la tabla:', error);
});
// authenticate.sync()
//   .then(() => {
//     console.log('Modelo sincronizado con la base de datos');
//   })
//   .catch((error) => {
//     console.error('Error al sincronizar el modelo:', error);
//   });
const PORT = process.env.PORT || 5000;
app.get('/:params', (req, res) => {
    const notFound = {
        error: -1,
        desc: `Error: /${req.params.params}. La URL ${req.method} no esta autorizada.`
    };
    res.send(notFound);
});
server.listen(PORT, () => {
    console.log(`Estas conectado a http://localhost:${PORT}`);
});
