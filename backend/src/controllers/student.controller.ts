import { Request, Response } from "express";
import {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudent,
    deleteStudent
} from "../services/student.service";

// Get all students
export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await getAllStudents();
        res.status(200).json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
};

// Get one student
export const getStudent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const student = await getStudentById(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create a new student
export const addStudent = async (req: Request, res: Response) => {
    try {
        const student = await createStudent(req.body);

        res.status(201).json({
            message: "Student created successfully",
            student
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create student"
        });
    }
};

// Update a student
export const editStudent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const student = await updateStudent(id, req.body);

        res.status(200).json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update student"
        });
    }
};

// Delete a student
export const removeStudent = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        await deleteStudent(id);

        res.status(200).json({
            message: "Student deleted successfully"
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete student"
        });
    }
};