import express from "express";

import {
    getRooms,
    getOneRoom,
    addRoom,
    editRoom,
    removeRoom
} from "../controllers/hostel.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all hostel rooms
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getRooms
);

// Get hostel room by ID
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneRoom
);

// Add hostel room
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addRoom
);

// Update hostel room
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editRoom
);

// Delete hostel room
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeRoom
);

export default router;