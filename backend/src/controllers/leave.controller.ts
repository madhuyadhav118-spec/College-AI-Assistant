import { Request, Response } from "express";

import {
    getAllLeaves,
    getLeaveById,
    createLeave,
    updateLeave,
    deleteLeave
} from "../services/leave.service";

// Get all leave requests
export const getLeaves = async (req: Request, res: Response) => {
    try {

        const leaves = await getAllLeaves();

        res.status(200).json(leaves);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch leave requests"
        });
    }
};

// Get leave request by ID
export const getOneLeave = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const leave = await getLeaveById(id);

        if (!leave) {
            return res.status(404).json({
                message: "Leave request not found"
            });
        }

        res.status(200).json(leave);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Apply for leave
export const addLeave = async (req: Request, res: Response) => {
    try {

        const leave = await createLeave(req.body);

        res.status(201).json({
            message: "Leave request submitted successfully",
            leave
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to submit leave request",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update leave request
export const editLeave = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const leave = await updateLeave(id, req.body);

        res.status(200).json({
            message: "Leave request updated successfully",
            leave
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update leave request"
        });
    }
};

// Delete leave request
export const removeLeave = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteLeave(id);

        res.status(200).json({
            message: "Leave request deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete leave request"
        });
    }
};