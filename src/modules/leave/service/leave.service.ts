import { ILeave } from "../../../model/interface/leave.interface";
import Leave from "../../../model/leave.model";
import { injectable } from "tsyringe"

@injectable()
export class LeaveService {
    constructor() {}

    createLeave = async (data: Partial<ILeave >): Promise<ILeave> => {
        console.log("Entered in LEAVE SERVICE");
        const leave = await Leave.create(data);

        console.log(`leave data in SERVICE : ${leave}`);
        return leave;
    }
}