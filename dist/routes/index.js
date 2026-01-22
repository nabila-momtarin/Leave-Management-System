"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health_routes_1 = require("./health.routes");
const leave_routes_1 = require("./leave.routes");
const router = (0, express_1.Router)();
router.use("/health", health_routes_1.healthRouter);
router.use("/leave", leave_routes_1.leaveRouter);
exports.default = router;
