import express from "express";

import {
    getFeedback,
    getOneFeedback,
    addFeedback,
    editFeedback,
    removeFeedback
} from "../controllers/feedback.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all feedback
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    getFeedback
);

// Get feedback by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneFeedback
);

// Submit feedback
router.post(
    "/",
    authenticate,
    authorize("STUDENT"),
    addFeedback
);

// Update feedback
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editFeedback
);

// Delete feedback
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeFeedback
);

export default router;