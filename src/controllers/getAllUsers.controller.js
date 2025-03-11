import User from "../models/user.model.js";

export const getAllUsersController = async (req, res) => {
  try {
    const allUsers = await User.find();

    return res.status(200).json(allUsers);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};
