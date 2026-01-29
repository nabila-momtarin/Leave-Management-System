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
exports.authMiddleware = void 0;
const jwt_utils_1 = require("../utils/jwt.utils");
const api_response_1 = require("../utils/api.response");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    /* try { */
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    console.log(`Middleware : Token : ${token}`);
    if (!token) {
        console.log("Middleware : Token not found");
        throw new api_response_1.ApiError("Token not found", 4001);
    }
    const dcodedToken = /*await*/ (0, jwt_utils_1.verifyAccessToken)(token);
    if (!dcodedToken) {
        console.log("Middleware : Invalid Token");
        throw new api_response_1.ApiError("Invalid Token", 4010);
    }
    console.log("Token decoded successfully");
    next();
    /* } catch (err : any) {
        console.log(`Error : auth Middleware : ${err}`);
    } */
});
exports.authMiddleware = authMiddleware;
