"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_2 = __importDefault(require("mongoose"));
const leaveSchema = new mongoose_1.Schema({
    employeeId: {
        type: String,
        require: true,
    },
    leaveType: {
        type: String,
        enum: ["SICK", "CASUAL"],
        require: true,
    },
    leaveStatus: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        require: true,
    },
    reason: {
        type: String,
        require: false,
    },
    startDate: {
        type: Date,
        require: true,
    },
    endDate: {
        type: Date,
        require: true,
    },
});
const Leave = mongoose_2.default.model("Leave", leaveSchema);
exports.default = Leave;
