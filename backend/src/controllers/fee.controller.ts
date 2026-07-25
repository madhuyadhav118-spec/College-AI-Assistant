import { Request, Response } from "express";

import {
    getAllFees,
    getFeeById,
    createFee,
    updateFee,
    deleteFee
} from "../services/fee.service";

// Get all fees
export const getFees = async (req: Request, res: Response) => {
    try {

        const fees = await getAllFees();

        res.status(200).json(fees);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch fees"
        });
    }
};

// Get one fee
export const getOneFee = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const fee = await getFeeById(id);

        if (!fee) {
            return res.status(404).json({
                message: "Fee record not found"
            });
        }

        res.status(200).json(fee);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create fee
export const addFee = async (req: Request, res: Response) => {
    try {

        const fee = await createFee(req.body);

        res.status(201).json({
            message: "Fee record created successfully",
            fee
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create fee record",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update fee
export const editFee = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const fee = await updateFee(id, req.body);

        res.status(200).json({
            message: "Fee record updated successfully",
            fee
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update fee record"
        });
    }
};

// Delete fee
export const removeFee = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteFee(id);

        res.status(200).json({
            message: "Fee record deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete fee record"
        });
    }
};