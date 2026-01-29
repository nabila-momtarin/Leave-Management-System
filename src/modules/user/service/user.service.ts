import { injectable } from "tsyringe";
import User from "../../../model/user.model";
import { ApiError } from "../../../utils/api.response";

@injectable()
export class UserService {
  constructor() {}

  createUser = async (userData: Partial<IUser>): Promise<IUser> => {

    
    console.log("Entered in USER SERVICE");
    console.log(`request userData in CONTROLLER : ${userData}\n`);

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("Error : User already exists");
      throw new ApiError("User already exists", 400);
    }
    const user = await User.create(userData);

    console.log(`user in SERVICE : ${user}\n\n`);

    return user;
  };

  getAllUsers = async (): Promise<IUser[]> => {
    /* try { */

      console.log("Entered in USER SERVICE");
      const users = await User.find({});
      if(!users){
        console.log("SERVCIE : No users found");
        throw new ApiError("No users found", 404);
      }
      console.log("SERVICE : users : ", users);
      return users;

   /*  } catch (err) {
      console.log("SERVICE : Error : ", err);
      throw err;
    } */
  };
}
