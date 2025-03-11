import express from "express";

import { authorizeRoles, requireAuth } from "../middlewares/auth.middleware.js";
import { addTransactionController } from "../controllers/addTransactionController.controller.js";
import { getTransactionsController } from "../controllers/getTransactionsController.controller.js";
import { updateTransactionController } from "../controllers/updateTransactionController.controller.js";
import { deleteTransactionController } from "../controllers/deleteTransactionController.controller.js";
import { getAllTransactionsController } from "../controllers/getAllTransactionsController.controller.js";

const transactionRouter = express.Router();

transactionRouter.get(
  "/get-all-transactions",
  requireAuth,
  authorizeRoles("admin"),
  getAllTransactionsController
);

transactionRouter.get(
  "/get-transactions",
  requireAuth,
  getTransactionsController
);

transactionRouter.post(
  "/add-transaction",
  requireAuth,
  addTransactionController
);

transactionRouter.put(
  "/update-transaction",
  requireAuth,
  updateTransactionController
);

transactionRouter.delete(
  "/delete-transaction",
  requireAuth,
  deleteTransactionController
);

export default transactionRouter;
