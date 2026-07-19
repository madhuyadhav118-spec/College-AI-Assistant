import express from "express";
import {register, login} from "../controllers/auth.controller";
import { registerValidation } from "../validations/auth.validation";

const router = express.Router();

// Register User
router.post(
    "/register",
    registerValidation,
    register
);

// Login User
router.post("/login", login);

export default router;