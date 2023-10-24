"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const register_1 = __importDefault(require("../auth/register"));
function serverRouter(app) {
    app.use('/api', router);
    router.get('/raiz', (_req, res) => {
        res.send('En la raiz API. Funciona NODEMON en Docker :D.');
    });
    router.post('/login', (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);
        console.log(`Email: ${email}, Password: ${password}`);
        res.send(`Email: ${email}, Password: ${password}`);
    });
    router.post('/register', (req, res) => {
        const { email, password, name } = req.body;
        (0, register_1.default)(email, password);
    });
}
exports.default = serverRouter;
// module.exports = serverRouter
