import { MONGO_URL } from "./config";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MONGO DB...");

    console.log(`MONGO STRING : ${MONGO_URL}\n\n`);
    const db = await mongoose.connect(MONGO_URL);

    console.log("Connected to MONGO DB");
  } catch (err) {
    console.log(`Error while connecting DB ${err}`);
    process.exit(1);
  }
};
