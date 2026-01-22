import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { LeaveService } from "../service/leave.service";

@injectable()
export class LeaveController {
  constructor(private LeaveService: LeaveService) {}

  postLeave = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log("Entered in LEAVE CONTROLLER");
      const data = req.body;
      console.log(`request data in CONTROLLER : ${data}`);
      const leave = await this.LeaveService.createLeave(data);

      return res.status(200).json({
        status: "200",
        message: "Leave added successfully",
        timeStamp: new Date(),
        data: leave,
      });
    } catch (err) {
      console.log("ERROR in Leave CONTROLLER : ", err);
      return res.status(400).json(err);
    }
  };
}
