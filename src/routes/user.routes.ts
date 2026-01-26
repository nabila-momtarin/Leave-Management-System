import { Router } from "express";
import { UserController } from "../modules/user/controller/user.controller";
import { container } from "tsyringe";

const router = Router();

const userController = container.resolve(UserController);

router.post("/register", userController.goCreateUser);

router.post('/login' , userController.logInUser);


export const userRouter = router;