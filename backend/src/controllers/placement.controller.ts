import { Request, Response } from "express";

import {
    getAllPlacements,
    getPlacementById,
    createPlacement,
    updatePlacement,
    deletePlacement
} from "../services/placement.service";

// Get all placements
export const getPlacements = async (req: Request, res: Response) => {
    try {

        const placements = await getAllPlacements();

        res.status(200).json(placements);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch placements"
        });
    }
};

// Get placement by ID
export const getOnePlacement = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const placement = await getPlacementById(id);

        if (!placement) {
            return res.status(404).json({
                message: "Placement not found"
            });
        }

        res.status(200).json(placement);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Add placement
export const addPlacement = async (req: Request, res: Response) => {
    try {

        const placement = await createPlacement(req.body);

        res.status(201).json({
            message: "Placement created successfully",
            placement
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create placement",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update placement
export const editPlacement = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const placement = await updatePlacement(id, req.body);

        res.status(200).json({
            message: "Placement updated successfully",
            placement
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update placement"
        });
    }
};

// Delete placement
export const removePlacement = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deletePlacement(id);

        res.status(200).json({
            message: "Placement deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete placement"
        });
    }
};