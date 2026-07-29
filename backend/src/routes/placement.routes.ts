import express from "express";

import {
    getPlacements,
    getOnePlacement,
    addPlacement,
    editPlacement,
    removePlacement
} from "../controllers/placement.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all placements
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getPlacements
);

// Get placement by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOnePlacement
);

// Add placement
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addPlacement
);

// Update placement
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editPlacement
);

// Delete placement
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removePlacement
);

export default router;