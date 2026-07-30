import { Request, Response } from "express";

import {
    getAllApplications,
    getApplicationById,
    createApplication,
    updateApplication,
    deleteApplication
} from "../services/placementApplication.service";

// Get all applications
export const getApplications = async (req: Request, res: Response) => {
    try {

        const applications = await getAllApplications();

        res.status(200).json(applications);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch applications"
        });
    }
};

// Get application by ID
export const getOneApplication = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const application = await getApplicationById(id);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json(application);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create application
export const addApplication = async (req: Request, res: Response) => {
    try {

        const application = await createApplication(req.body);

        res.status(201).json({
            message: "Application submitted successfully",
            application
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to submit application",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update application
export const editApplication = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const application = await updateApplication(id, req.body);

        res.status(200).json({
            message: "Application updated successfully",
            application
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update application"
        });
    }
};

// Delete application
export const removeApplication = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteApplication(id);

        res.status(200).json({
            message: "Application deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete application"
        });
    }
};