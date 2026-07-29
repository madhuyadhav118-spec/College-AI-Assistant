import { Request, Response } from "express";

import {
    getAllIssues,
    getIssueById,
    createIssue,
    updateIssue,
    deleteIssue
} from "../services/libraryIssue.service";

// Get all issued books
export const getIssues = async (req: Request, res: Response) => {
    try {

        const issues = await getAllIssues();

        res.status(200).json(issues);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch issued books"
        });
    }
};

// Get issue by ID
export const getOneIssue = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const issue = await getIssueById(id);

        if (!issue) {
            return res.status(404).json({
                message: "Issue record not found"
            });
        }

        res.status(200).json(issue);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Issue a book
export const addIssue = async (req: Request, res: Response) => {
    try {

        const issue = await createIssue(req.body);

        res.status(201).json({
            message: "Book issued successfully",
            issue
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to issue book",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update issue
export const editIssue = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const issue = await updateIssue(id, req.body);

        res.status(200).json({
            message: "Issue updated successfully",
            issue
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update issue"
        });
    }
};

// Delete issue
export const removeIssue = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteIssue(id);

        res.status(200).json({
            message: "Issue deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete issue"
        });
    }
};