import express from "express";

import { requireAuth } from "../middlewares/auth.middleware.js";
import { generateReportController } from "../controllers/generateReportController.controller.js";

const reportRouter = express.Router();

reportRouter.get("/generate-report", requireAuth, generateReportController);

export default reportRouter;
