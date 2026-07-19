import prisma from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (
    full_name: string,
    email: string,
    password: string,
    role: "ADMIN" | "FACULTY" | "STUDENT",
    phone?: string
) => {

    // Check if email already exists
    const existingUser = await prisma.users.findUnique({
        where: {
            email
        }
    });

    if (existingUser) {
        return null;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await prisma.users.create({
        data: {
            full_name,
            email,
            password: hashedPassword,
            role,
            phone
        }
    });

    return user;
};

// Login User (Secure + JWT)
export const loginUser = async (email: string, password: string) => {

    // Find user by email
    const user = await prisma.users.findUnique({
        where: {
            email
        }
    });

    // User not found
    if (!user) {
        return null;
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return null;
    }

    // Generate JWT Token
    const token = jwt.sign(
        {
            userId: user.user_id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    );

    // Return user and token
    return {
        user,
        token
    };
};