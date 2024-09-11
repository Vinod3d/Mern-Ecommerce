import jwt from "jsonwebtoken";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import { JWT_KEY } from "../config/index.js";
import { User } from "../models/UserSchema.js";

const auth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return next(CustomErrorHandler.unAuthorized("You Are Not valid user"));
  }

  try {
    const user = jwt.verify(token, JWT_KEY);
    req.user = await User.findOne({ _id: user.id });
    next();
  } catch (error) {
    return next(error);
  }
};

export default auth;