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
      const data : ILeave = req.body;
      if (!data) {
        console.log("Controller: no data found from req");
        throw new ApiError("No data found", 400);
      }
      console.log(`request data in CONTROLLER : ${data}`);
      const leave : ILeave = await this.LeaveService.createLeave(data);

      if(!leave) {
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
