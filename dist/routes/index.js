"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_routes_1 = require("./health.routes");
const leave_routes_1 = require("./leave.routes");
const user_routes_1 = require("./user.routes");
const auth_routes_1 = require("./auth.routes");
const whatsapp_routes_1 = __importDefault(require("./whatsapp.routes"));
const router = (0, express_1.Router)();
router.use("/health", health_routes_1.healthRouter);
router.use("/leave", leave_routes_1.leaveRouter);
router.use("/users", user_routes_1.userRouter);
router.use("/auth", auth_routes_1.authRouter);
router.use("/whatsapp", whatsapp_routes_1.default);
exports.default = router;
