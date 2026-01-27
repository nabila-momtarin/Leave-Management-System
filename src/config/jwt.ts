import dotenv from "dotenv";

dotenv.config();

export const SECRET_KEY: string = process.env.SECRET_KEY || "HACKED--!!!--";
export const EXPIRES_IN = process.env.EXPIRES_IN || "50s";

//is it mendatory to type define in this file? 
// as we also define type in config file