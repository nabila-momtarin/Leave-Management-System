import { injectable } from "tsyringe";
import { UserService } from "../service/user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  goCreateUser = async (req: Request, res: Response): Promise<any> => {
    try {
      console.log("Entered in USER CONTROLLER");
      const data = req.body;
      // console.log(`request data in CONTROLLER : ${data}`);
      console.log("request data in CONTROLLER :", data);

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const user = await this.userService.createUser({
        ...data,
        password: hashedPassword,
      });
      console.log(`user in controller : ${user}\n\n`);

      return res.status(200).json({
        status: "200",
        message: "User added successfully",
        timeStamp: new Date(),
        data: user,
      });
    } catch (err) {
      console.log("ERROR in User CONTROLLER : ", err);
      return res.status(400).json(err);
    }
  };

  getAllUsers = async (req: Request, res: Response): Promise<any> => {
    try {
      
      console.log("Entered in USER CONTROLLER");
      const users = await this.userService.getAllUsers();
       res.status(200).json({
        status: "200",
        message: "Users fetched successfully",
        timeStamp: new Date(),
        data: users,
      });
    } catch (err) {
      console.log("ERROR in User CONTROLLER : ", err);
    }
  };
}
