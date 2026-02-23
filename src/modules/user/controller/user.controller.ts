import { injectable } from "tsyringe";
import { UserService } from "../service/user.service";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ApiError } from "../../../utils/api.response";

@injectable()
export class UserController {
  constructor(private userService: UserService) {}

  goCreateUser = async (req: Request, res: Response): Promise<any> => {
    /*     try { */
    console.log("Entered in USER CONTROLLER");
    const data = req.body;
    // console.log(`request data in CONTROLLER : ${data}`);
    console.log("request data in CONTROLLER :", data);
    //check profile pic exist or not
    console.log("image in CONTROLLER :", req.files);
    if (!req.files) {
      throw new ApiError("No profile picture/documents uploaded", 400);
      // return res.status(400).send("No profile picture uploaded.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    if(!hashedPassword){
      throw new ApiError("Error in hashing password", 400);
    }
    const userData: IUser = {
      ...data,
      password: hashedPassword,
      // profilePic: "string",
      // doc: req.files.,
    };

    const user = await this.userService.createUser(userData);
    if(!user){
      throw new ApiError("Error in creating user", 400);
    }
    console.log(`user in controller : ${user}\n\n`);

    return res.status(200).json({
      status: "200",
      message: "User added successfully",
      timeStamp: new Date(),
      data: user,
    });
    /*  } catch (err) {
      console.log("ERROR in User CONTROLLER : ", err);
     //  return res.status(400).json(err);
    } */
  };

  getAllUsers = async (req: Request, res: Response): Promise<any> => {
    // try {
      console.log("Entered in USER CONTROLLER");
      const users = await this.userService.getAllUsers();
      if(!users){
        throw new ApiError("No users found", 404);
      }
      
      res.status(200).json({
        status: "200",
        message: "Users fetched successfully",
        timeStamp: new Date(),
        data: users,
      });
    // } catch (err) {
    //   console.log("ERROR in User CONTROLLER : ", err);
    // }
  };
}
