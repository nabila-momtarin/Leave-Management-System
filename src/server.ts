import "reflect-metadata";

import { connectDB } from "./config/db";
import app from "./app";
import { PORT } from "./config/config";

import { ensureUploadDirs } from "./utils/ensureUploadDirs";



const startServer = async () => {
  try {
    console.log("MONGO DB will be connected shortly...");

    await connectDB();

    ensureUploadDirs(); // 👈 server start এর আগে call

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    });
  } catch (err) { 
    console.log(`Error in startServer : ${err}`);
    process.exit(1);
  }
};

startServer();
