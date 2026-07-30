import express from "express";

import { adminDashboard } from "../controllers/dashboard.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Admin Dashboard
router.get(
    "/admin",
    authenticate,
    authorize("ADMIN"),
    adminDashboard
);

export default router;