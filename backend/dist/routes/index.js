"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
function serverRouter(app) {
    app.use('/api', router);
    router.get('/raiz', (_req, res) => {
        res.send('En la raiz API. Funciona NODEMON en Docker :D.');
    });
    router.post('/login', (_req, res) => {
        const { email, password } = _req.params;
        res.send(`Email: ${email}, Password: ${password}`);
    });
}
exports.default = serverRouter;
// module.exports = serverRouter
