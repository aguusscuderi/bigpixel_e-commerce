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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = require("../utils/auth/generateToken");
function isValidPswd(user, pswd) {
    return bcrypt_1.default.compare(pswd, user.password);
}
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (!user)
            return res.status(400).json({ err: "This user does not exist." });
        //let isMatch = await bcrypt.compare(password, user.password);
        const isMatch = yield isValidPswd(user, password);
        console.log(isMatch);
        if (!isMatch)
            return res.status(400).json({ err: "Incorrect password." });
        const access_token = (0, generateToken_1.createAccessToken)({ id: user.id });
        const refresh_token = (0, generateToken_1.createRefreshToken)({ id: user.id });
        res.json({
            msg: "Login Success!",
            refresh_token,
            access_token,
            user: {
                name: user.name,
                email: user.email,
                role: user.role,
                root: user.root,
            },
        });
    }
    catch (err) {
        return res.status(500).json({ err: err });
    }
});
