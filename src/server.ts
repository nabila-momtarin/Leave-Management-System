import "reflect-metadata";
import { container } from "tsyringe";
import { connectDB } from "./config/db";

import { ensureUploadDirs } from "./utils/ensureUploadDirs";
import { LeaveScheduler } from "./modules/leave/leave.scheduler";

import app from "./app";
import { PORT } from "./config/config";

const startServer = async () => {
  try {
    console.log("MONGO DB will be connected shortly...");

    await connectDB();

    ensureUploadDirs(); // 👈 server start এর আগে call

    const leaveScheduler = container.resolve(LeaveScheduler);  // DI container handles instantiation
    leaveScheduler.scheduleLeaveReminder(); // This will run the cron job , as in start scheduler before server starts listening and right after DB is connected

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });
  } catch (err) { 
    console.log(`Error in startServer : ${err}`);
    process.exit(1);
  }
};

startServer();
