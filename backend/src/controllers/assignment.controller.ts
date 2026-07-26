import { Request, Response } from "express";

import {
    getAllAssignments,
    getAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment
} from "../services/assignment.service";

// Get all assignments
export const getAssignments = async (req: Request, res: Response) => {
    try {

        const assignments = await getAllAssignments();

        res.status(200).json(assignments);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch assignments"
        });
    }
};

// Get one assignment
export const getOneAssignment = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const assignment = await getAssignmentById(id);

        if (!assignment) {
            return res.status(404).json({
                message: "Assignment not found"
            });
        }

        res.status(200).json(assignment);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create assignment
export const addAssignment = async (req: Request, res: Response) => {
    try {

        const assignment = await createAssignment(req.body);

        res.status(201).json({
            message: "Assignment created successfully",
            assignment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create assignment",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update assignment
export const editAssignment = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const assignment = await updateAssignment(id, req.body);

        res.status(200).json({
            message: "Assignment updated successfully",
            assignment
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update assignment"
        });
    }
};

// Delete assignment
export const removeAssignment = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteAssignment(id);

        res.status(200).json({
            message: "Assignment deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete assignment"
        });
    }
};