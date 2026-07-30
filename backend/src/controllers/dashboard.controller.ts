import { Request, Response } from "express";

import { getAdminDashboard } from "../services/dashboard.service";

// Admin Dashboard
export const adminDashboard = async (
    req: Request,
    res: Response
) => {
    try {

        const dashboard = await getAdminDashboard();

        res.status(200).json(dashboard);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to load dashboard"
        });

    }
};