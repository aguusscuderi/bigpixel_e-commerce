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
const user_service_1 = require("../../service/user.service");
function googleOAuthHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // GET THE CODE FROM QS
            const code = req.query.code;
            const { id_token, access_token } = yield (0, user_service_1.getGoogleOAuthTokens)({ code });
            console.log({ id_token, access_token });
            // GET THE ID AND ACCESS TOKEN W THE CODE
            // GET USER W TOKENS
            // UPSERT THE USER
            //CREATE SESSION
            // CREACE ACCES & REFRESH TOKENS
            // SET COOKIES
            // REDIRECT TO THE CLIENT
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
exports.default = { googleOAuthHandler };
