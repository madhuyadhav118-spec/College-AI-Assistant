import { Request, Response } from "express";

import {
    getAllExaminations,
    getExaminationById,
    createExamination,
    updateExamination,
    deleteExamination
} from "../services/examination.service";

// Get all examinations
export const getExaminations = async (req: Request, res: Response) => {
    try {

        const examinations = await getAllExaminations();

        res.status(200).json(examinations);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch examinations"
        });
    }
};

// Get one examination
export const getOneExamination = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const examination = await getExaminationById(id);

        if (!examination) {
            return res.status(404).json({
                message: "Examination not found"
            });
        }

        res.status(200).json(examination);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create examination
export const addExamination = async (req: Request, res: Response) => {
    try {

        const examination = await createExamination(req.body);

        res.status(201).json({
            message: "Examination created successfully",
            examination
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create examination",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update examination
export const editExamination = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const examination = await updateExamination(id, req.body);

        res.status(200).json({
            message: "Examination updated successfully",
            examination
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update examination"
        });
    }
};

// Delete examination
export const removeExamination = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteExamination(id);

        res.status(200).json({
            message: "Examination deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete examination"
        });
    }
};