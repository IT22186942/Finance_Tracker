import express from "express";

import { authorizeRoles, requireAuth } from "../middlewares/auth.middleware.js";
import { getAllBudgetsController } from "../controllers/getAllBudgets.controller.js";
import { addBudgetController } from "../controllers/addBudgetController.controller.js";
import { updateBudgetController } from "../controllers/updateBudgetController.controller.js";
import { deleteBudgetController } from "../controllers/deleteBudgetController.controller.js";
import { getBudgetsController } from "../controllers/getBudgetsController.controller.js";

const budgetRouter = express.Router();

budgetRouter.get(
  "/get-all-budgets",
  requireAuth,
  authorizeRoles("admin"),
  getAllBudgetsController
);

budgetRouter.get("/get-budgets", requireAuth, getBudgetsController);

budgetRouter.post("/add-budget", requireAuth, addBudgetController);

budgetRouter.put("/update-budget", requireAuth, updateBudgetController);

budgetRouter.delete("/delete-budget", requireAuth, deleteBudgetController);

export default budgetRouter;
