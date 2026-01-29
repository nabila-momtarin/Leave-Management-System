"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponse = exports.ApiError = void 0;
exports.sendSuccess = sendSuccess;
// export class ApiError extends Error {
//   status: number;
//   constructor(obj: { status: number; message: string }) {
//     super(obj.message);
//     this.status = obj.status;
//   }
// }
class ApiError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApiError = ApiError;
class ApiResponse {
    constructor(data, message, pagination) {
        this.success = true;
        this.data = data;
        this.message = message;
        this.pagination = pagination;
    }
    static success(obj) {
        var _a, _b;
        const status = (_a = obj.status) !== null && _a !== void 0 ? _a : 200;
        const responseData = new ApiResponse(obj.data, (_b = obj.message) !== null && _b !== void 0 ? _b : "Request is successful", obj.pagination);
        return obj.response.status(status).json(responseData);
    }
}
exports.ApiResponse = ApiResponse;
function sendSuccess(options) {
    var _a;
    return ApiResponse.success({
        response: options.res,
        data: options.data,
        message: (_a = options.message) !== null && _a !== void 0 ? _a : "Success",
        pagination: options.pagination,
        status: options.status,
    });
}
