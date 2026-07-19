import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { validationResult } from "express-validator";
// Register User
export const register = async (req: Request, res: Response) => {
    try {
        // Check validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            full_name,
            email,
            password,
            role,
            phone
        } = req.body;

        const user = await registerUser(
            full_name,
            email,
            password,
            role,
            phone
        );

        if (!user) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Login User
export const login = async (req: Request, res: Response) => {
    try {

        const { email, password } = req.body;

        const result = await loginUser(email, password);

        if (!result) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        res.status(200).json({
            message: "Login successful",
            user: result.user,
            token: result.token
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};