import { Router } from "express";
import {LeaveController} from "../modules/leave/controller/leave.controller";
import { container } from "tsyringe";


const router = Router();

const leaveController =container.resolve(LeaveController);

// router.post("/leave2", LeaveController.postLeave.bind(LeaveController));
router.post("/leave2", leaveController.postLeave);

export const leaveRouter = router;