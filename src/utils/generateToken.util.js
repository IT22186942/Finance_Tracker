import jwt from "jsonwebtoken";
import { ACCESS_TOKEN } from "../configs/envConfig.js";

const generateToken = (userId) => {
  const token = jwt.sign({ userId }, ACCESS_TOKEN, {
    expiresIn: "30d",
  });

  return token;
};

export default generateToken;
