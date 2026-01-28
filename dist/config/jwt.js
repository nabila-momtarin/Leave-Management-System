"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPIRES_IN = exports.SECRET_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.SECRET_KEY = process.env.SECRET_KEY || "HACKED--!!!--";
exports.EXPIRES_IN = process.env.EXPIRES_IN || "50s";
//is it mandatory to type define in this file? 
// as we also define type in config file
