import { Router } from "express";
import { healthRouter } from "./health.routes";
import { leaveRouter } from "./leave.routes";
import { userRouter } from "./user.routes";
import { authRouter } from "./auth.routes";

const router = Router();


router.use("/health", healthRouter);
router.use("/leave", leaveRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;