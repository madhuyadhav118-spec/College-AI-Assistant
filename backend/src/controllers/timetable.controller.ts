import { Request, Response } from "express";
import {
    getAllTimetable,
    getTimetableById,
    createTimetable,
    updateTimetable,
    deleteTimetable
} from "../services/timetable.service";

// Get all timetable entries
export const getTimetable = async (req: Request, res: Response) => {
    try {

        const timetable = await getAllTimetable();

        res.status(200).json(timetable);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch timetable"
        });

    }
};

// Get one timetable entry
export const getOneTimetable = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const timetable = await getTimetableById(id);

        if (!timetable) {
            return res.status(404).json({
                message: "Timetable entry not found"
            });
        }

        res.status(200).json(timetable);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Create timetable entry
export const addTimetable = async (req: Request, res: Response) => {
    try {

        const timetable = await createTimetable(req.body);

        res.status(201).json({
            message: "Timetable entry created successfully",
            timetable
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create timetable entry"
        });

    }
};

// Update timetable entry
export const editTimetable = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const timetable = await updateTimetable(id, req.body);

        res.status(200).json({
            message: "Timetable updated successfully",
            timetable
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update timetable"
        });

    }
};

// Delete timetable entry
export const removeTimetable = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteTimetable(id);

        res.status(200).json({
            message: "Timetable deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete timetable"
        });

    }
};