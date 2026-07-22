import express from "express";
import {
    getCourses,
    getOneCourse,
    addCourse,
    editCourse,
    removeCourse
} from "../controllers/course.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// All Course APIs require login
router.use(authenticate);

// View Courses
router.get("/", authorize("ADMIN", "FACULTY", "STUDENT"), getCourses);
router.get("/:id", authorize("ADMIN", "FACULTY", "STUDENT"), getOneCourse);

// Only ADMIN can modify Courses
router.post("/", authorize("ADMIN"), addCourse);
router.put("/:id", authorize("ADMIN"), editCourse);
router.delete("/:id", authorize("ADMIN"), removeCourse);

export default router;