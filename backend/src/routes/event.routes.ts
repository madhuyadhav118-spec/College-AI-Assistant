import express from "express";

import {
    getEvents,
    getOneEvent,
    addEvent,
    editEvent,
    removeEvent
} from "../controllers/event.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// Get all events
router.get(
    "/",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getEvents
);

// Get one event
router.get(
    "/:id",
    authenticate,
    authorize("ADMIN", "FACULTY", "STUDENT"),
    getOneEvent
);

// Create event
router.post(
    "/",
    authenticate,
    authorize("ADMIN"),
    addEvent
);

// Update event
router.put(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    editEvent
);

// Delete event
router.delete(
    "/:id",
    authenticate,
    authorize("ADMIN"),
    removeEvent
);

export default router;