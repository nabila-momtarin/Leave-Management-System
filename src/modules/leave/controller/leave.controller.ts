import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { LeaveService } from "../service/leave.service";
import { ApiError } from "../../../utils/api.response";
import { ILeave } from "../../../model/interface/leave.interface";

@injectable()
export class LeaveController {
  constructor(private LeaveService: LeaveService) {}

  postLeave = async (req: Request, res: Response): Promise<any> => {
    // try {
    console.log("Entered in LEAVE CONTROLLER");
    const body = req.body;
    if (
      !body.employeeId ||
      !body.leaveType ||
      !body.leaveStatus ||
      !body.startDate ||
      !body.endDate ||
      typeof body.startDate !== "string" ||
      typeof body.endDate !== "string" ||
      typeof body.employeeId !== "string" ||
      typeof body.leaveType !== "string" ||
      typeof body.leaveStatus !== "string"
    ) {
      console.log("Controller: Invalid request payload");
      throw new ApiError("Invalid request payload", 400);
    }

    const data: ILeave = body;

    console.log(`request data in CONTROLLER : ${data}`);
    console.log("\n", data);
    const leave: ILeave = await this.LeaveService.createLeave(data);

    if (!leave) {
      console.log("Controller: Leave not created");
      throw new ApiError("Leave not created", 400);
    }

    return res.status(200).json({
      status: "200",
      message: "Leave added successfully",
      timeStamp: new Date(),
      data: leave,
    });
    // } catch (err) {
    //   console.log("ERROR in Leave CONTROLLER : ", err);
    //   return res.status(400).json(err);
    // }
  };
}
