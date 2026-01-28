import { Router } from "express";
import { UserController } from "../modules/user/controller/user.controller";
import { container } from "tsyringe";
import { authMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/media.middleware";

const router = Router();

const userController = container.resolve(UserController);

router.post("/register", upload.fields([
    {
        name: "image",
        maxCount: 3
    },{
        name: "docs",
        maxCount: 1
    }
]), userController.goCreateUser);

router.get("/", authMiddleware ,userController.getAllUsers);


export const userRouter = router;