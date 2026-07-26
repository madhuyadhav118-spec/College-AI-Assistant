import express from "express";

import {
    getNotices,
    getOneNotice,
    addNotice,
    editNotice,
    removeNotice
} from "../controllers/notice.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all notices
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getNotices
);

// Get notice by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneNotice
);

// Create notice
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addNotice
);

// Update notice
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editNotice
);

// Delete notice
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeNotice
);

export default router;