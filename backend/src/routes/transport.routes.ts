import express from "express";

import {
    getBuses,
    getOneBus,
    addBus,
    editBus,
    removeBus
} from "../controllers/transport.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all buses
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getBuses
);

// Get bus by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneBus
);

// Add bus
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addBus
);

// Update bus
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editBus
);

// Delete bus
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeBus
);

export default router;