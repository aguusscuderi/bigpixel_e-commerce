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
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        // const errMsg = valid(name, email, password, cf_password);
        // if (errMsg) return res.status(400).json({ err: errMsg });
        const user = yield user_1.default.findOne({ where: { email: email } });
        if (user) {
            console.log('El usuario ya existe.');
            return res.status(400).json({ err: "This email already exists." });
        }
        const passwordHash = yield bcrypt_1.default.hash(password, 10);
        const newUser = new user_1.default({
            name,
            email,
            password: passwordHash,
        });
        yield newUser.save();
        res.json({ msg: "Register Success!" });
    }
    catch (err) {
        return res.status(500).json({ err: err });
    }
});
exports.default = register;
