import { User } from "../../models/UserSchema.js";

const userSingle = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(error);
  }
};

export default userSingle;
