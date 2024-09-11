 import mongoose from "mongoose";
import { JWT_EXPIRES, JWT_KEY } from "../config/index.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';

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


// FOR HASHING PASSWORD
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// FOR COMPARING PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id}, JWT_KEY, {expiresIn: JWT_EXPIRES})
}

export const User = mongoose.model("User", userSchema);