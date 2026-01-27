import { Router } from "express";
import { UserController } from "../modules/user/controller/user.controller";
import { container } from "tsyringe";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

const userController = container.resolve(UserController);

router.post("/register", userController.goCreateUser);

router.get("/", authMiddleware ,userController.getAllUsers);


export const userRouter = router;