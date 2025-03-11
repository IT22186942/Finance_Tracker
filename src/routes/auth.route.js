import express from "express";

import { userSignUpController } from "../controllers/userSignUp.controller.js";
import { userSignInController } from "../controllers/userSignIn.controller.js";
import { userSignOutController } from "../controllers/userSignOut.controller.js";

const authRouter = express.Router();

authRouter.post("/sign-up", userSignUpController);
authRouter.post("/sign-in", userSignInController);
authRouter.get("/sign-out", userSignOutController);

export default authRouter;
