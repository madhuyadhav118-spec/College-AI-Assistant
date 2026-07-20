import express from "express";
import {
    getAttendance,
    getOneAttendance,
    addAttendance,
    editAttendance,
    removeAttendance
} from "../controllers/attendance.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// All Attendance APIs require login
router.use(authenticate);

// View Attendance
router.get("/", authorize("ADMIN", "FACULTY", "STUDENT"), getAttendance);
router.get("/:id", authorize("ADMIN", "FACULTY", "STUDENT"), getOneAttendance);

// Only ADMIN and FACULTY can manage attendance
router.post("/", authorize("ADMIN", "FACULTY"), addAttendance);
router.put("/:id", authorize("ADMIN", "FACULTY"), editAttendance);
router.delete("/:id", authorize("ADMIN"), removeAttendance);

export default router;