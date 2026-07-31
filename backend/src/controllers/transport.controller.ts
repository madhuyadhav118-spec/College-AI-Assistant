import { Request, Response } from "express";

import {
    getAllBuses,
    getBusById,
    createBus,
    updateBus,
    deleteBus
} from "../services/transport.service";

// Get all buses
export const getBuses = async (req: Request, res: Response) => {
    try {

        const buses = await getAllBuses();

        res.status(200).json(buses);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch buses"
        });

    }
};

// Get bus by ID
export const getOneBus = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const bus = await getBusById(id);

        if (!bus) {
            return res.status(404).json({
                message: "Bus not found"
            });
        }

        res.status(200).json(bus);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Create bus
export const addBus = async (req: Request, res: Response) => {
    try {

        const bus = await createBus(req.body);

        res.status(201).json({
            message: "Bus created successfully",
            bus
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create bus",
            error: error instanceof Error ? error.message : error
        });

    }
};

// Update bus
export const editBus = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const bus = await updateBus(id, req.body);

        res.status(200).json({
            message: "Bus updated successfully",
            bus
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update bus"
        });

    }
};

// Delete bus
export const removeBus = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteBus(id);

        res.status(200).json({
            message: "Bus deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete bus"
        });

    }
};