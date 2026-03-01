import { ILeave } from "../../../model/interface/leave.interface";
import Leave from "../../../model/leave.model";
import { injectable } from "tsyringe"
import { ApiError } from "../../../utils/api.response";

@injectable()
export class LeaveService {
    constructor() {}

    createLeave = async (data: Partial<ILeave >): Promise<ILeave> => {
        console.log("Entered in LEAVE SERVICE");
        const leave = await Leave.create(data);
        if (!leave) {
            console.log("Error : Leave not created");
            throw new ApiError("Leave not created", 400);
        }

        console.log(`leave data in SERVICE : ${leave}`);
        return leave;
    }

    sendLeaveReminders = async (): Promise<void> => {
        console.log("Sending leave reminders...");

        //code to fetch pending leave requests and send reminders
    }
}