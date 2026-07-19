import express from "express";
import {
    getFaculty,
    getOneFaculty,
    addFaculty,
    editFaculty,
    removeFaculty
} from "../controllers/faculty.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// All Faculty APIs require login
router.use(authenticate);

// View Faculty
router.get("/", authorize("ADMIN", "FACULTY"), getFaculty);
router.get("/:id", authorize("ADMIN", "FACULTY"), getOneFaculty);

// Only ADMIN can modify Faculty
router.post("/", authorize("ADMIN"), addFaculty);
router.put("/:id", authorize("ADMIN"), editFaculty);
router.delete("/:id", authorize("ADMIN"), removeFaculty);

export default router;