import { User } from "../../models/UserSchema.js";

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send({
      success: true,
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    return next(error);
  }
};

export default deleteUser;
