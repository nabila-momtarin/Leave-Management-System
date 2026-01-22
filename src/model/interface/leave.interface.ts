export interface ILeave {
    employeeId: string;
    leaveType: string;
    leaveStatus: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
}