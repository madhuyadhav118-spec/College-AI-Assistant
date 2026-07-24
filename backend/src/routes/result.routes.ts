import express from "express";

import {
    getResults,
    getOneResult,
    addResult,
    editResult,
    removeResult
} from "../controllers/result.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all results
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getResults
);

// Get result by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneResult
);

// Create result
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addResult
);

// Update result
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editResult
);

// Delete result
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeResult
);

export default router;