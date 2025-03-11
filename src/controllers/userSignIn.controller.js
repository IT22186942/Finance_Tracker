import { NODE_ENV } from "../configs/envConfig.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";
import bcrypt from "bcrypt";

export const userSignInController = async (req, res) => {
  try {
    const userToSignIn = { ...req.body };

    // Check if user already exists.
    const user = await User.findOne({ email: userToSignIn.email });

    if (!user) {
      return res.status(401).json({
        message: "Email doesn't exist, Sign Up.",
      });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(
      userToSignIn.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    // Generate jwt access token
    const token = generateToken(user._id);
    res.cookie("accessToken", token, {
      httpOnly: true, // Enhances security by preventing client-side scripts from accessing the cookie
      secure: NODE_ENV, // Ensures the cookie is only transmitted over secure HTTPS connections
      sameSite: "None", // Prevent CSRF attacks
      maxAge: 1 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "User sign in successful.",
      user,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};
