import { body } from "express-validator";

export const registerValidation = [

    body("full_name")
        .notEmpty()
        .withMessage("Full name is required"),

    body("email")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("password")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("role")
        .isIn(["ADMIN", "FACULTY", "STUDENT"])
        .withMessage("Invalid role")

];