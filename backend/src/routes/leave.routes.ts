import express from "express";

import {
    getLeaves,
    getOneLeave,
    addLeave,
    editLeave,
    removeLeave
} from "../controllers/leave.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// View all leave requests (Admin & Faculty)
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY"),
    getLeaves
);

// View one leave request
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneLeave
);

// Student/Faculty apply for leave
router.post(
    "/",
    authenticate,
    authorize("STUDENT", "FACULTY"),
    addLeave
);

// Admin updates leave status
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editLeave
);

// Delete leave request
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeLeave
);

export default router;