import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.utils";
import { ApiError } from "../utils/api.response";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    /* try { */
        const token = req.headers.authorization?.split(" ")[1];
        console.log(`Middleware : Token : ${token}`);

        if( !token ) {
            console.log("Middleware : Token not found");
            throw new ApiError("Token not found", 4001);
        }

        const dcodedToken = /*await*/ verifyAccessToken(token);

        if( !dcodedToken ) {
            console.log("Middleware : Invalid Token");
            throw new ApiError("Invalid Token", 4010);
        }

        console.log("Token decoded successfully");

        next();
        
    /* } catch (err : any) {
        console.log(`Error : auth Middleware : ${err}`);
    } */
}
