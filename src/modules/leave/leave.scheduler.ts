import cron from "node-cron";
import { injectable } from "tsyringe";
import { LeaveService } from "./service/leave.service";
import { EmailService } from "./service/email.service";
import { WhatsAppService } from "../whatsapp/service/whatsapp.service";


@injectable()
export class LeaveScheduler {
  constructor(
    private leaveService: LeaveService,
    private emailService: EmailService,
    private whatsappService: WhatsAppService
  ) {}

  scheduleLeaveReminder() {
    cron.schedule("*/1 * * * *", async() => {  // '*/1' মানে প্রতি 1 মিনিটে
      console.log("Running leave reminder task every 1 minute");

      await this.leaveService.sendLeaveReminders();
      await this.whatsappService.sendMessage(
        '8801987908970', // Replace with actual phone number
        'Hello World, This is a reminder for upcoming leave from whatsapp scheduler.'
      );

      await this.emailService.sendEmail(
        'admin@taghyeer.ai',
        'Leave Reminder',
        'This is a reminder for upcoming leave.'
      );
    });
  }
}
