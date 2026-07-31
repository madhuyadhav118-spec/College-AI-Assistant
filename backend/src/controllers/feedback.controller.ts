import { Request, Response } from "express";

import {
    getAllFeedback,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback
} from "../services/feedback.service";

// Get all feedback
export const getFeedback = async (req: Request, res: Response) => {
    try {

        const feedback = await getAllFeedback();

        res.status(200).json(feedback);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch feedback"
        });

    }
};

// Get feedback by ID
export const getOneFeedback = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const feedback = await getFeedbackById(id);

        if (!feedback) {
            return res.status(404).json({
                message: "Feedback not found"
            });
        }

        res.status(200).json(feedback);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Create feedback
export const addFeedback = async (req: Request, res: Response) => {
    try {

        const feedback = await createFeedback(req.body);

        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to submit feedback",
            error: error instanceof Error ? error.message : error
        });

    }
};

// Update feedback
export const editFeedback = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const feedback = await updateFeedback(id, req.body);

        res.status(200).json({
            message: "Feedback updated successfully",
            feedback
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update feedback"
        });

    }
};

// Delete feedback
export const removeFeedback = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteFeedback(id);

        res.status(200).json({
            message: "Feedback deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete feedback"
        });

    }
};