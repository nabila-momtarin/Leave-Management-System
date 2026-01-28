"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controller_1 = require("../modules/user/controller/user.controller");
const tsyringe_1 = require("tsyringe");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const media_middleware_1 = __importDefault(require("../middlewares/media.middleware"));
const router = (0, express_1.Router)();
const userController = tsyringe_1.container.resolve(user_controller_1.UserController);
router.post("/register", media_middleware_1.default.fields([
    {
        name: "image",
        maxCount: 3
    }, {
        name: "docs",
        maxCount: 1
    }
]), userController.goCreateUser);
router.get("/", auth_middleware_1.authMiddleware, userController.getAllUsers);
exports.userRouter = router;
