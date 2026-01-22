import { ILeave } from "./interface/leave.interface";
import { Schema } from "mongoose";
import mongoose from "mongoose";

const leaveSchema = new Schema<ILeave>({
  employeeId: {
    type: String,
    require: true,
  },
  leaveType: {
    type: String,
    enum: ["SICK", "CASUAL"],
    require: true,
  },
  leaveStatus: {
    type: String,
    enum: ["PENDING", "APPROVED", "REJECTED"],
    require: true,
  },
 
  reason: {
    type: String,
    require: false,
  },
   startDate: {
    type: Date,
    require: true,
  },
  endDate: {
    type: Date,
    require: true,
  },
});




const Leave = mongoose.model("Leave", leaveSchema);
export default Leave;
