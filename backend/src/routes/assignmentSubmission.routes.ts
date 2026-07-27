import express from "express";

import {
    getSubmissions,
    getOneSubmission,
    addSubmission,
    editSubmission,
    removeSubmission
} from "../controllers/assignmentSubmission.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all submissions
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    getSubmissions
);

// Get submission by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneSubmission
);

// Student submits assignment
router.post(
    "/",
    authenticate,
    authorize("STUDENT"),
    addSubmission
);

// Faculty/Admin updates marks/status
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    editSubmission
);

// Delete submission
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    removeSubmission
);

export default router;