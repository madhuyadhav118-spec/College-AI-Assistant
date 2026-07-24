import express from "express";

import {
    getExaminations,
    getOneExamination,
    addExamination,
    editExamination,
    removeExamination
} from "../controllers/examination.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all examinations
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getExaminations
);

// Get examination by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneExamination
);

// Create examination
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addExamination
);

// Update examination
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editExamination
);

// Delete examination
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeExamination
);

export default router;