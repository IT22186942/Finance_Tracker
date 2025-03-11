import express from "express";

import { requireAuth } from "../middlewares/auth.middleware.js";
import { getAllBudgetsController } from "../controllers/getAllBudgets.controller.js";

const budgetRouter = express.Router();

budgetRouter.get("/get-all-budgets", requireAuth, getAllBudgetsController);

export default budgetRouter;
