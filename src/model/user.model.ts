import { model, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    require: true,
    default: "user",
  },
  createdAt: {
    type: String,
    require: true,
  },
  profilePic: {
    type: Array<string>,
    require: false,
  },
});

const User = model<IUser>("User", userSchema);
export default User;
