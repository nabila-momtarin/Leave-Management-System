"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_1 = require("../config/jwt");
const generateAccessToken = (userId) => {
    try {
        console.log("\nExpires In: ", jwt_1.EXPIRES_IN);
        console.log("Secret Key :", jwt_1.SECRET_KEY);
        console.log(`accessToken : in JWT.UTILS : ${userId}`);
        const accessToken = jsonwebtoken_1.default.sign({ userId }, jwt_1.SECRET_KEY, {
            expiresIn: jwt_1.EXPIRES_IN,
        });
        console.log(`\naccessToken in utils : ${accessToken}\n`);
        return accessToken;
    }
    catch (err) {
        console.log(`Error while generating accessToken ${err}`);
        throw new Error("Error while generating accessToken");
        // process.exit(1);
    }
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    try {
        console.log("Secret Key in Verify token jwtutils : ", jwt_1.SECRET_KEY);
        console.log("JWTUTILS : TOKEN : ", token);
        const verifiedToken = jsonwebtoken_1.default.verify(token, jwt_1.SECRET_KEY);
        console.log(`decodedToken in utils : ${verifiedToken}\n`);
        return verifiedToken;
    }
    catch (err) {
        console.log(`JWT.UTILS :Error while verifying accessToken ${err}`);
        throw new Error("Error while verifying accessToken");
        // process.exit(1);
    }
};
exports.verifyAccessToken = verifyAccessToken;
//error throw korle pexit eya lage na cz 2ta e fun return er kaj kore, r8?
//StringValue
//jwt.SignOptions["expiresIn"]
