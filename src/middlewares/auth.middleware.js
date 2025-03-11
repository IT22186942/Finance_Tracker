import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../configs/envConfig.js";

// Middleware to require authentication for protected routes
// export const requireAuth = async (req, res, next) => {
//   try {
//     const token = req.cookies.accessToken;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Token not available.", status: false });
//     }

//     const decoded = jwt.verify(token, ACCESS_TOKEN);

//     if (decoded.exp && Date.now() > decoded.exp * 1000) {
//       return res
//         .status(401)
//         .json({ error: "Token expired, please log in again" });
//     }

//     const user = await User.findById(decoded.userId).select("-password");

//     req.user = user;
//     next();
//   } catch (err) {
//     if (err instanceof jwt.JsonWebTokenError) {
//       return res.status(401).json({ error: "Invalid token signature" });
//     } else {
//       console.log(err);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// };

export const requireAuth = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract token after "Bearer "

    const decoded = jwt.verify(token, ACCESS_TOKEN);

    // Check if token has expired
    if (decoded.exp && Date.now() > decoded.exp * 1000) {
      return res
        .status(401)
        .json({ error: "Token expired, please log in again" });
    }

    // Fetch user and attach to req object
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      console.error(err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied." });
    }
    next();
  };
};
