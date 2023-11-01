"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const register_1 = __importDefault(require("../auth/register"));
const login_1 = __importDefault(require("../auth/login"));
function serverRouter(app) {
    app.use('/api', router);
    // DELETES:
    // UPDATES:
    // GETS:
    // router.get('sessions/oauth/google', googleOAuthHandler())
    // POSTS: 
    router.post('/login', (req, res) => { (0, login_1.default)(req, res); });
    router.post('/register', (req, res) => { (0, register_1.default)(req, res); });
}
exports.default = serverRouter;
// module.exports = serverRouter
