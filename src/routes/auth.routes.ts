import { Router } from "express";
import { AuthController } from "../modules/user/controller/auth.controller";
import { container } from "tsyringe";

const router = Router();

const authController = container.resolve(AuthController);

router.post("/login", authController.login);

export const authRouter = router;