import cron from "node-cron";
import { injectable } from "tsyringe";
import { LeaveService } from "./service/leave.service";
import { EmailService } from "./service/email.service";


@injectable()
export class LeaveScheduler {
  constructor(
    private leaveService: LeaveService,
    private emailService: EmailService
  ) {}

  scheduleLeaveReminder() {
    cron.schedule("51 12 * * *", async() => {  // '*/1' মানে প্রতি 1 মিনিটে
      console.log("Running leave reminder task every 1 minute");

      await this.leaveService.sendLeaveReminders();
      await this.emailService.sendEmail(
        'admin@taghyeer.ai',
        'Leave Reminder',
        'This is a reminder for upcoming leave.'
      );
    });
  }
}
