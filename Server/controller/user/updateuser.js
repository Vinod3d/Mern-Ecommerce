import { User } from "../../models/UserSchema.js";

const updateUser = async (req, res, next) => {
  const { first_name, last_name, email, mobile, dob, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(CustomErrorHandler.notFound("User not found"));
    }

    // Update only provided fields
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (mobile) user.mobile = mobile;
    if (dob) user.dob = dob;
    if (password) user.password = password; // Password will be hashed by the pre-save middleware

    // Save the user to trigger pre-save hooks (e.g., password hashing)
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

export default updateUser;
