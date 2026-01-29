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
exports.AuthController = void 0;
const jwt_utils_1 = require("../../../utils/jwt.utils");
const user_model_1 = __importDefault(require("../../../model/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const api_response_1 = require("../../../utils/api.response");
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            // try {
            console.log("\nEntered in Auth Controller : Log In");
            const { email, password } = req.body;
            if (!email || !password) {
                console.log("Invalid Credentials: Missing email or password");
                throw new api_response_1.ApiError("Missing email or password", 401);
            }
            console.log(`Controller : name : ${email} password : ${password}\n`);
            const user = yield user_model_1.default.findOne({ email });
            //   console.log(`user id : CONTROLLER: ${user._id}`);
            if (!user) {
                console.log("Invalid Credentials: User not found in Controller");
                throw new api_response_1.ApiError("Invalid Credentials: User not found", 401);
                // return res.status(401).json("Invalid Credentials: User not found");
            }
            // password check
            const isMatchedPass = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatchedPass) {
                console.log("Controller: Invalid Credentials: wrong Password");
                throw new api_response_1.ApiError("Invalid Credentials: Wrong Password", 409);
                // return res.status(401).json("Invalid Credentials: Wrong Password");
            }
            console.log(`user id : CONTROLLER: ${user._id}`);
            // cosnt errors = validationResult(req);
            const token = (0, jwt_utils_1.generateAccessToken)(user._id);
            if (!token) {
                console.log("Controller: Token generation failed");
                throw new api_response_1.ApiError("Token generation failed", 401);
            }
            console.log(`Token in AUTH CONTROLLER : ${token}\n`);
            return res.status(200).json({
                status: "200",
                message: "User logged in successfully",
                timeStamp: new Date(),
                data: token,
            });
            // } catch (err: unknown) {
            //   console.log(`Error in AUTH CONTROLLER : LOGIN : ${err}\n`);
            //   return res.status(400).json(err);
            // }
        });
    }
}
exports.AuthController = AuthController;
