import { NODE_ENV } from "../configs/envConfig.js";
import User from "../models/user.model.js";
import generateToken from "../utils/generateToken.util.js";
import bcrypt from "bcrypt";

export const userSignUpController = async (req, res) => {
  try {
    const userToSignUp = { ...req.body };
    console.log(userToSignUp);

    // Check if user already exists.
    const existingUser = await User.findOne({ email: userToSignUp.email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists." });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(userToSignUp.password, 10);

    const newUserToSignUp = {
      ...userToSignUp,
      password: hashedPassword,
    };

    // Create new user in db.
    const user = await User.create(newUserToSignUp);

    // Generate jwt access token
    const token = generateToken(user._id);
    res.cookie("accessToken", token, {
      httpOnly: true, // Enhances security by preventing client-side scripts from accessing the cookie
      secure: NODE_ENV, // Ensures the cookie is only transmitted over secure HTTPS connections
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days`
    });

    return res.status(201).json({ message: "User sign up successful.", user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error.", error: err });
  }
};
