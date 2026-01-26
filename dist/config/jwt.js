"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
exports.jwtConfig = {
    secretKey: process.env.JWT_SECRET_KEY || 'ghorardimersecrekeyXX',
    expiresIn: process.env.JWT_EXPIRES_IN || '10min',
};
