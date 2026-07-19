import express from "express";
import {
    getDepartments,
    getDepartment,
    addDepartment,
    editDepartment,
    removeDepartment
} from "../controllers/department.controller";

import { authenticate } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

// All Department APIs require login
router.use(authenticate);

// View Departments
router.get("/", authorize("ADMIN", "FACULTY", "STUDENT"), getDepartments);
router.get("/:id", authorize("ADMIN", "FACULTY", "STUDENT"), getDepartment);

// Only ADMIN can modify Departments
router.post("/", authorize("ADMIN"), addDepartment);
router.put("/:id", authorize("ADMIN"), editDepartment);
router.delete("/:id", authorize("ADMIN"), removeDepartment);

export default router;