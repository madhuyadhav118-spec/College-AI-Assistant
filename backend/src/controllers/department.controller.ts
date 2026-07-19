import { Request, Response } from "express";
import {
    getAllDepartments,
    getDepartmentById,
    createDepartment,
    updateDepartment,
    deleteDepartment
} from "../services/department.service";

// Get all departments
export const getDepartments = async (req: Request, res: Response) => {
    try {

        const departments = await getAllDepartments();

        res.status(200).json(departments);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch departments"
        });
    }
};

// Get one department
export const getDepartment = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const department = await getDepartmentById(id);

        if (!department) {
            return res.status(404).json({
                message: "Department not found"
            });
        }

        res.status(200).json(department);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create department
export const addDepartment = async (req: Request, res: Response) => {
    try {

        const department = await createDepartment(req.body);

        res.status(201).json({
            message: "Department created successfully",
            department
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create department"
        });
    }
};

// Update department
export const editDepartment = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const department = await updateDepartment(id, req.body);

        res.status(200).json({
            message: "Department updated successfully",
            department
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update department"
        });
    }
};

// Delete department
export const removeDepartment = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteDepartment(id);

        res.status(200).json({
            message: "Department deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete department"
        });
    }
};