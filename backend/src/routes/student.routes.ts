import express from "express";
import {
    getStudents,
    getStudent,
    addStudent,
    editStudent,
    removeStudent
} from "../controllers/student.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// All student routes require login
router.use(authenticate);

// ADMIN and FACULTY can view students
router.get("/", authorize("ADMIN", "FACULTY"), getStudents);

// ADMIN and FACULTY can view one student
router.get("/:id", authorize("ADMIN", "FACULTY"), getStudent);

// Only ADMIN can create students
router.post("/", authorize("ADMIN"), addStudent);

// Only ADMIN can update students
router.put("/:id", authorize("ADMIN"), editStudent);

// Only ADMIN can delete students
router.delete("/:id", authorize("ADMIN"), removeStudent);

export default router;