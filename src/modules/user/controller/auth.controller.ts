import { Request, Response } from "express";
import { generateAccessToken } from "../../../utils/jwt.utils";
import User from "../../../model/user.model";
import bcrypt from "bcrypt";
import { ApiError } from "../../../utils/api.response";

export class AuthController {
  constructor() {}

  login = async (req: Request, res: Response): Promise<any> => {
    // try {
      console.log("\nEntered in Auth Controller : Log In");

      const { email, password } = req.body;
      if (!email || !password) {
        console.log("Invalid Credentials: Missing email or password");
        throw new ApiError("Missing email or password", 401);
      }
      console.log(`Controller : name : ${email} password : ${password}\n`);

      const user = await User.findOne({ email });

      //   console.log(`user id : CONTROLLER: ${user._id}`);

      if (!user) {
        console.log("Invalid Credentials: User not found in Controller");
        throw new ApiError("Invalid Credentials: User not found", 401);
        // return res.status(401).json("Invalid Credentials: User not found");
      }

      // password check
      const isMatchedPass = await bcrypt.compare(password, user.password);

      if (!isMatchedPass) {
        console.log("Controller: Invalid Credentials: wrong Password");
        throw new ApiError("Invalid Credentials: Wrong Password", 409); 
        // return res.status(401).json("Invalid Credentials: Wrong Password");
      }

      console.log(`user id : CONTROLLER: ${user._id}`);

      // cosnt errors = validationResult(req);

      const token =  generateAccessToken(user._id);

      if (!token) {
        console.log("Controller: Token generation failed");
        throw new ApiError("Token generation failed", 401); 
      }

      console.log(`Token in AUTH CONTROLLER : ${token}\n`);

      return res.status(200).json({
        status: "200",
        message: "User logged in successfully",
        timeStamp: new Date(),
        data: token,
      });
    // } catch (err: unknown) {
    //   console.log(`Error in AUTH CONTROLLER : LOGIN : ${err}\n`);
    //   return res.status(400).json(err);
    // }
  };
}
