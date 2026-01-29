import { ErrorRequestHandler } from "express";
import { MongoServerError } from "mongodb";
import { Error as MongooseError } from "mongoose";
import multer from "multer";
import { ApiError } from "../utils/api.response";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err, "came in err handler");
  let statusCode = 500;
  let message = "An unexpected error occurred";

  if (err instanceof ApiError) {
    // your custom errors
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof multer.MulterError) {
    statusCode = 400;
    message = err.message;
  } else if (err instanceof MongooseError.ValidationError) {
    // schema validation (e.g. enum)
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join("; ");
  } else if (err instanceof MongooseError.CastError) {
    // invalid ObjectId, etc.
    statusCode = 400;
    message = `Invalid ${err.path}: ${err.value}`;
  } else if (err instanceof MongoServerError) {
    // MongoDB server errors (E11000, etc.)
    statusCode = 400;

    if (err.code === 11000) {
      // Duplicate key error
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      const value = err.keyValue ? err.keyValue[field] : "unknown";
      message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } '${value}' already exists`;
    } else {
      message = err.message;
    }
  } else if (err.code === 11000) {
    // Alternative check for duplicate key error (in case it's not caught above)
    statusCode = 400;
    const match = err.message.match(/dup key: \{ (.+?): "(.+?)" \}/);
    if (match) {
      const field = match[1];
      const value = match[2];
      message = `${
        field.charAt(0).toUpperCase() + field.slice(1)
      } '${value}' already exists`;
    } else {
      message = "Duplicate entry detected";
    }
  } else if (typeof (err as any).status === "number") {
    // any other lib that sets .status
    statusCode = (err as any).status;
    message = err.message || message;
  }

  console.warn("[ErrorHandler]", err);
  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
