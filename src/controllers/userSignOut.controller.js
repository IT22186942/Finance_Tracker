import { NODE_ENV } from "../configs/envConfig.js";

export const userSignOutController = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      secure: NODE_ENV, // Ensures the cookie is only transmitted over secure HTTPS connections
      sameSite: "None",
      expires: new Date(0),
    });

    return res.status(200).json({ message: "User sign out successful." });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};
