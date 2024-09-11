import { User } from "../../models/UserSchema.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import { JwtService } from "../../services/JwtService.js";

const register = async (req, res, next) => {
  const { first_name, last_name, email, mobile, dob, password } = req.body;
  try {
    if (!first_name || !last_name || !email || !mobile || !dob || !password) {
      return next(CustomErrorHandler.badRequest("All fields are required"));
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      mobile,
      dob,
      password,
    });

    JwtService(user, "User Registered Successfully", 201, res);
  } catch (error) {
    return next(error);
  }
};

export default register;
