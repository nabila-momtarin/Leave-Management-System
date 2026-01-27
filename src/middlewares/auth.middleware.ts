import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";
//import { Error } from "mongoose";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log(`Middleware : Token : ${token}`);

        if( !token ) {
            console.log("Middleware : Token not found");
            throw new Error("Token not found");
        }

        const dcodedToken = /*await*/ verifyAccessToken(token);

        if( !dcodedToken ) {
            console.log("Middleware : Invalid Token");
            throw new Error("Invalid Token");
        }

        console.log("Token decoded successfully");

        next();
        
    } catch (err : any) {
        console.log(`Error : auth Middleware : ${err}`);
    }
}