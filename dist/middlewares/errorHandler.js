"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const multer_1 = __importDefault(require("multer"));
const api_response_1 = require("../utils/api.response");
const errorHandler = (err, req, res, next) => {
    console.log(err, "came in err handler");
    let statusCode = 500;
    let message = "An unexpected error occurred";
    if (err instanceof api_response_1.ApiError) {
        // your custom errors
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof multer_1.default.MulterError) {
        statusCode = 400;
        message = err.message;
    }
    else if (err instanceof mongoose_1.Error.ValidationError) {
        // schema validation (e.g. enum)
        statusCode = 400;
        message = Object.values(err.errors)
            .map((e) => e.message)
            .join("; ");
    }
    else if (err instanceof mongoose_1.Error.CastError) {
        // invalid ObjectId, etc.
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }
    else if (err instanceof mongodb_1.MongoServerError) {
        // MongoDB server errors (E11000, etc.)
        statusCode = 400;
        if (err.code === 11000) {
            // Duplicate key error
            const field = Object.keys(err.keyPattern || {})[0] || "field";
            const value = err.keyValue ? err.keyValue[field] : "unknown";
            message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
        }
        else {
            message = err.message;
        }
    }
    else if (err.code === 11000) {
        // Alternative check for duplicate key error (in case it's not caught above)
        statusCode = 400;
        const match = err.message.match(/dup key: \{ (.+?): "(.+?)" \}/);
        if (match) {
            const field = match[1];
            const value = match[2];
            message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
        }
        else {
            message = "Duplicate entry detected";
        }
    }
    else if (typeof err.status === "number") {
        // any other lib that sets .status
        statusCode = err.status;
        message = err.message || message;
    }
    console.warn("[ErrorHandler]", err);
    res.status(statusCode).json({
        success: false,
        message,
    });
};
exports.default = errorHandler;
