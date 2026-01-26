import { injectable } from "tsyringe";
import User from "../../../model/user.model";
import bcrypt from "bcrypt";
import { jwtConfig } from "../../../config/jwt";
import jwt, { Secret } from "jsonwebtoken";
import { StringValue } from "ms";
@injectable()
export class UserService {
  constructor() {}

  createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    console.log("Entered in USER SERVICE");
    console.log(`request userData in CONTROLLER : ${userData}\n`);

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("Error : User already exists");
      throw new Error("User already exists");
    }
    const user = await User.create(userData);

    console.log(`user in SERVICE : ${user}\n\n`);

    return user;
  };

  static login = async (email: string, password: string): Promise<any> => {
    console.log("\nEntered in USER SERVICE");
    console.log(jwtConfig.secretKey, "secret key from userService");
    console.log(jwtConfig.expiresIn, "expiresIn from userService");

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("Error : User not found!");
      throw new Error("User not found!");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      console.log("Error : Invalid password!");
      throw new Error("Invalid password!");
    }

    // if (!jwtConfig?.secretKey) {
    //   throw new Error("JWT secret key is not defined");
    // }

    const secretKey =
      jwtConfig && jwtConfig.secretKey
        ? jwtConfig.secretKey
        : "cholomorejai";

    // const expiresIn = jwtConfig?.expiresIn ? jwtConfig.expiresIn : "10";

    const token = jwt.sign(
      { id: user._id, email: user.email },
      secretKey,
      { expiresIn: jwtConfig.expiresIn  },
    );

    return token;
  };
}
