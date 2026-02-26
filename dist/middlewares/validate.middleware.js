"use strict";
// import { Request, Response, NextFunction } from "express";
// import { ZodSchema } from "zod";
// import { ApiError } from "../utils/api.response";
// import { error } from "console";
// type ValidationSource = "body" | "query" | "params";
// export const validate =
//   (schema: ZodSchema, source: ValidationSource = "body") =>
//   (req: Request, _res: Response, next: NextFunction) => {
//     const result = schema.safeParse(req[source]);
//     if (!result.success) {
//       const errors = result.error.issues.map((err) => ({
//         field: err.path.join("."),
//         message: err.message,
//       }));
//       return next(new ApiError(400, "Validation failed", errors));
//     }
//     // Replace incoming data with validated & cleaned data
//     req[source] = result.data;
//     next();
//   };
