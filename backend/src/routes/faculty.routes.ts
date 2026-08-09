import express from "express";

import {
    getFaculty,
    getOneFaculty,
    addFaculty,
    editFaculty,
    removeFaculty
} from "../controllers/faculty.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

router.use(authenticate);

// Get all faculty
router.get(
    "/",
    authorize("ADMIN", "FACULTY"),
    getFaculty
);

// Get one faculty
router.get(
    "/:id",
    authorize("ADMIN", "FACULTY"),
    getOneFaculty
);

// Create faculty
router.post(
    "/",
    authorize("ADMIN"),
    addFaculty
);

// Update faculty
router.put(
    "/:id",
    authorize("ADMIN"),
    editFaculty
);

// Delete faculty
router.delete(
    "/:id",
    authorize("ADMIN"),
    removeFaculty
);

export default router;