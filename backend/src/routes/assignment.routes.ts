import express from "express";

import {
    getAssignments,
    getOneAssignment,
    addAssignment,
    editAssignment,
    removeAssignment
} from "../controllers/assignment.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all assignments
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getAssignments
);

// Get assignment by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneAssignment
);

// Create assignment
router.post(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    addAssignment
);

// Update assignment
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    editAssignment
);

// Delete assignment
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    removeAssignment
);

export default router;