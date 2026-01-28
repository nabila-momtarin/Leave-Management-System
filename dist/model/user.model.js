"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
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
        type: (Array),
        require: false,
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
