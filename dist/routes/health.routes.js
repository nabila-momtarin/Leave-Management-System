"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRouter = void 0;
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get("/health2", (req, res) => {
    console.log(" Successfull health Router");
    res.json({
        status: "200",
        message: "Healthy",
        timeStamp: new Date()
    });
});
exports.healthRouter = router;
