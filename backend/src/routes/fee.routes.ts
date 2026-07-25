import express from "express";

import {
    getFees,
    getOneFee,
    addFee,
    editFee,
    removeFee
} from "../controllers/fee.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all fees
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "STUDENT"),
    getFees
);

// Get one fee
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "STUDENT"),
    getOneFee
);

// Create fee
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addFee
);

// Update fee
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editFee
);

// Delete fee
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeFee
);

export default router;