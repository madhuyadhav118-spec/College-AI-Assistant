import express from "express";

import {
    getIssues,
    getOneIssue,
    addIssue,
    editIssue,
    removeIssue
} from "../controllers/libraryIssue.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all issued books
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    getIssues
);

// Get one issue
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    getOneIssue
);

// Issue a book
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addIssue
);

// Update issue
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editIssue
);

// Delete issue
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeIssue
);

export default router;