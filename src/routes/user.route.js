import express from "express";

import { authorizeRoles, requireAuth } from "../middlewares/auth.middleware.js";
import { getAllUsersController } from "../controllers/getAllUsers.controller.js";

const userRouter = express.Router();

userRouter.get(
  "/get-all-users",
  requireAuth,
  authorizeRoles("admin"),
  getAllUsersController
);

export default userRouter;
