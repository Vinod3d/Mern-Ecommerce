import { User } from "../../models/UserSchema.js";
import CustomErrorHandler from "../../services/CustomErrorHandler.js";
import { JwtService } from "../../services/JwtService.js";

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      CustomErrorHandler.badRequest("Email And Password Are Required!")
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        CustomErrorHandler.unAuthorized("Invalid Email Or Password!")
      );
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(
        CustomErrorHandler.unAuthorized("Invalid Email Or Password!")
      );
    }

    JwtService(user, "User logged In", 200, res);
  } catch (error) {
    return next(error);
  }
};

export default login;
