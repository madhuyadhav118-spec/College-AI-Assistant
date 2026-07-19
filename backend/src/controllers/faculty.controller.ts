import { Request, Response } from "express";
import {
    getAllFaculty,
    getFacultyById,
    createFaculty,
    updateFaculty,
    deleteFaculty
} from "../services/faculty.service";
//console.log("FACULTY CONTROLLER LOADED");

// Get all faculty
export const getFaculty = async (req: Request, res: Response) => {
    try {
        const faculty = await getAllFaculty();

        res.status(200).json(faculty);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch faculty"
        });
    }
};

// Get one faculty
export const getOneFaculty = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const faculty = await getFacultyById(id);

        if (!faculty) {
            return res.status(404).json({
                message: "Faculty not found"
            });
        }

        res.status(200).json(faculty);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create faculty
export const addFaculty = async (req: Request, res: Response) => {
    console.log("ADD FACULTY API CALLED");
    console.log(req.body);
    try {
        
        const faculty = await createFaculty(req.body);

        res.status(201).json({
            message: "Faculty created successfully",
            faculty
        });

    } catch (error) {
        console.error("Faculty Error:", error);

        res.status(500).json({
            message: "Failed to create faculty",
            error
        });
    }
};

// Update faculty
export const editFaculty = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const faculty = await updateFaculty(id, req.body);

        res.status(200).json({
            message: "Faculty updated successfully",
            faculty
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update faculty"
        });
    }
};

// Delete faculty
export const removeFaculty = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteFaculty(id);

        res.status(200).json({
            message: "Faculty deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete faculty"
        });
    }
};