import express from "express";

import {
    getTimetable,
    getOneTimetable,
    addTimetable,
    editTimetable,
    removeTimetable
} from "../controllers/timetable.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// All timetable APIs require login
router.use(authenticate);

// View timetable
router.get("/", authorize("ADMIN", "FACULTY", "STUDENT"), getTimetable);
router.get("/:id", authorize("ADMIN", "FACULTY", "STUDENT"), getOneTimetable);

// Only ADMIN can modify timetable
router.post("/", authorize("ADMIN"), addTimetable);
router.put("/:id", authorize("ADMIN"), editTimetable);
router.delete("/:id", authorize("ADMIN"), removeTimetable);

export default router;