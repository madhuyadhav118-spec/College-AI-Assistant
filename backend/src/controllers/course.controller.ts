import { Request, Response } from "express";
import {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} from "../services/course.service";

// Get all courses
export const getCourses = async (req: Request, res: Response) => {
    try {

        const courses = await getAllCourses();

        res.status(200).json(courses);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch courses"
        });

    }
};

// Get one course
export const getOneCourse = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const course = await getCourseById(id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(course);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Create course
export const addCourse = async (req: Request, res: Response) => {
    try {

        const course = await createCourse(req.body);

        res.status(201).json({
            message: "Course created successfully",
            course
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create course"
        });

    }
};

// Update course
export const editCourse = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const course = await updateCourse(id, req.body);

        res.status(200).json({
            message: "Course updated successfully",
            course
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update course"
        });

    }
};

// Delete course
export const removeCourse = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteCourse(id);

        res.status(200).json({
            message: "Course deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete course"
        });

    }
};