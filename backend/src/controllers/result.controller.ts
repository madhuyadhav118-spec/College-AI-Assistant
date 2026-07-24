import { Request, Response } from "express";

import {
    getAllResults,
    getResultById,
    createResult,
    updateResult,
    deleteResult
} from "../services/result.service";

// Get all results
export const getResults = async (req: Request, res: Response) => {
    try {

        const results = await getAllResults();

        res.status(200).json(results);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch results"
        });
    }
};

// Get one result
export const getOneResult = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const result = await getResultById(id);

        if (!result) {
            return res.status(404).json({
                message: "Result not found"
            });
        }

        res.status(200).json(result);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create result
export const addResult = async (req: Request, res: Response) => {
    try {

        const result = await createResult(req.body);

        res.status(201).json({
            message: "Result created successfully",
            result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create result",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update result
export const editResult = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const result = await updateResult(id, req.body);

        res.status(200).json({
            message: "Result updated successfully",
            result
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update result"
        });
    }
};

// Delete result
export const removeResult = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteResult(id);

        res.status(200).json({
            message: "Result deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete result"
        });
    }
};