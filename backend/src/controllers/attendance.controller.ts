import { Request, Response } from "express";
import {
    getAllAttendance,
    getAttendanceById,
    createAttendance,
    updateAttendance,
    deleteAttendance
} from "../services/attendance.service";

// Get all attendance
export const getAttendance = async (req: Request, res: Response) => {
    try {

        const attendance = await getAllAttendance();

        res.status(200).json(attendance);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch attendance"
        });
    }
};

// Get one attendance
export const getOneAttendance = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const attendance = await getAttendanceById(id);

        if (!attendance) {
            return res.status(404).json({
                message: "Attendance record not found"
            });
        }

        res.status(200).json(attendance);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create attendance
export const addAttendance = async (req: Request, res: Response) => {
    try {

        const attendance = await createAttendance(req.body);

        res.status(201).json({
            message: "Attendance created successfully",
            attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create attendance"
        });
    }
};

// Update attendance
export const editAttendance = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const attendance = await updateAttendance(id, req.body);

        res.status(200).json({
            message: "Attendance updated successfully",
            attendance
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update attendance"
        });
    }
};

// Delete attendance
export const removeAttendance = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteAttendance(id);

        res.status(200).json({
            message: "Attendance deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete attendance"
        });
    }
};