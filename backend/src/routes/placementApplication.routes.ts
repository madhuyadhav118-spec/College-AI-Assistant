import express from "express";

import {
    getApplications,
    getOneApplication,
    addApplication,
    editApplication,
    removeApplication
} from "../controllers/placementApplication.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all applications
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    getApplications
);

// Get application by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneApplication
);

// Student applies for placement
router.post(
    "/",
    authenticate,
    authorize("STUDENT"),
    addApplication
);

// Update application
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    editApplication
);

// Delete application
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeApplication
);

export default router;