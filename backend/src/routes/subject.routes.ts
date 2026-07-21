import express from "express";
import {
    getSubjects,
    getOneSubject,
    addSubject,
    editSubject,
    removeSubject
} from "../controllers/subject.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// All Subject APIs require login
router.use(authenticate);

// View Subjects
router.get("/", authorize("ADMIN", "FACULTY", "STUDENT"), getSubjects);
router.get("/:id", authorize("ADMIN", "FACULTY", "STUDENT"), getOneSubject);

// Only ADMIN can modify Subjects
router.post("/", authorize("ADMIN"), addSubject);
router.put("/:id", authorize("ADMIN"), editSubject);
router.delete("/:id", authorize("ADMIN"), removeSubject);

export default router;