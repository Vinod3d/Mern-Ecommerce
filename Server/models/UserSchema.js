 import mongoose from "mongoose";
import { JWT_EXPIRES, JWT_KEY } from "../config/index.js";
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, "email is Required"],
        unique: [true, "already in database"],
    },
    mobile: {
        type: String,
        required: [true, "mobile is Required"],
        unique: [true, "already in database"],
    },
    dob: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        default: "Active",
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: String,
        default: "Inactive",
    },
    },
    { timestamps: true}
);


userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, JWT_KEY, {expiresIn: JWT_EXPIRES})
}

export const User = mongoose.model("User", userSchema);