import { Request, Response } from "express";

import {
    getAllNotices,
    getNoticeById,
    createNotice,
    updateNotice,
    deleteNotice
} from "../services/notice.service";

// Get all notices
export const getNotices = async (req: Request, res: Response) => {
    try {

        const notices = await getAllNotices();

        res.status(200).json(notices);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch notices"
        });
    }
};

// Get one notice
export const getOneNotice = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const notice = await getNoticeById(id);

        if (!notice) {
            return res.status(404).json({
                message: "Notice not found"
            });
        }

        res.status(200).json(notice);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create notice
export const addNotice = async (req: Request, res: Response) => {
    try {

        const notice = await createNotice(req.body);

        res.status(201).json({
            message: "Notice created successfully",
            notice
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create notice",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update notice
export const editNotice = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const notice = await updateNotice(id, req.body);

        res.status(200).json({
            message: "Notice updated successfully",
            notice
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update notice"
        });
    }
};

// Delete notice
export const removeNotice = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteNotice(id);

        res.status(200).json({
            message: "Notice deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete notice"
        });
    }
};