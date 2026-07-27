import { Request, Response } from "express";

import {
    getAllSubmissions,
    getSubmissionById,
    createSubmission,
    updateSubmission,
    deleteSubmission
} from "../services/assignmentSubmission.service";

// Get all submissions
export const getSubmissions = async (req: Request, res: Response) => {
    try {

        const submissions = await getAllSubmissions();

        res.status(200).json(submissions);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch submissions"
        });
    }
};

// Get one submission
export const getOneSubmission = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const submission = await getSubmissionById(id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }

        res.status(200).json(submission);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create submission
export const addSubmission = async (req: Request, res: Response) => {
    try {

        const submission = await createSubmission(req.body);

        res.status(201).json({
            message: "Assignment submitted successfully",
            submission
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to submit assignment",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update submission
export const editSubmission = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const submission = await updateSubmission(id, req.body);

        res.status(200).json({
            message: "Submission updated successfully",
            submission
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update submission"
        });
    }
};

// Delete submission
export const removeSubmission = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteSubmission(id);

        res.status(200).json({
            message: "Submission deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete submission"
        });
    }
};