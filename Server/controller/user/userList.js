import { User } from "../../models/UserSchema.js";

const userList = async (req, res, next) => {
  try {
    const userData = await User.find()
      .sort({ createdAt: -1 })
      .select("-password");
    res.status(200).json({
      success: true,
      userData,
    });
  } catch (error) {
    return next(error);
  }
};

export default userList;
