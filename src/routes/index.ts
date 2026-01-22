import { Router } from "express";
import { healthRouter } from "./health.routes";
import { leaveRouter } from "./leave.routes";

const router = Router();


router.use("/health", healthRouter);
router.use("/leave", leaveRouter);

export default router;