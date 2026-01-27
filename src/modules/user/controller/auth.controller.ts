import { Request, Response } from "express";
import { generateAccessToken } from "../../../utils/jwt.utils";
import User from "../../../model/user.model";
import bcrypt from "bcrypt";

export class AuthController {
  constructor() {}

  login = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log("\nEntered in Auth Controller : Log In");

      const { email, password } = req.body;
      console.log(`Controller : name : ${email} password : ${password}\n`);

      const user = await User.findOne({ email });

      //   console.log(`user id : CONTROLLER: ${user._id}`);

      if (!user) {
        console.log("Invalid Credentials: User not found in Controller");
        return res.status(401).json("Invalid Credentials: User not found");
      }

      // password check
      const isMatchedPass = await bcrypt.compare(password, user.password);

      if (!isMatchedPass) {
        console.log("Controller: Invalid Credentials: wrong Password");
        return res.status(401).json("Invalid Credentials: Wrong Password");
      }

      console.log(`user id : CONTROLLER: ${user._id}`);

      // cosnt errors = validationResult(req);

      const token =  generateAccessToken(user._id);

      console.log(`Token in AUTH CONTROLLER : ${token}\n`);

      return res.status(200).json({
        status: "200",
        message: "User logged in successfully",
        timeStamp: new Date(),
        data: token,
      });
    } catch (err: unknown) {
      console.log(`Error in AUTH CONTROLLER : LOGIN : ${err}\n`);
      return res.status(400).json(err);
    }
  };
}
