import { Request, Response } from "express";
import {
    getAllSubjects,
    getSubjectById,
    createSubject,
    updateSubject,
    deleteSubject
} from "../services/subject.service";

// Get all subjects
export const getSubjects = async (req: Request, res: Response) => {
    try {

        const subjects = await getAllSubjects();

        res.status(200).json(subjects);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch subjects"
        });

    }
};

// Get one subject
export const getOneSubject = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const subject = await getSubjectById(id);

        if (!subject) {
            return res.status(404).json({
                message: "Subject not found"
            });
        }

        res.status(200).json(subject);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }

};

// Create subject
export const addSubject = async (req: Request, res: Response) => {

    try {

        const subject = await createSubject(req.body);

        res.status(201).json({
            message: "Subject created successfully",
            subject
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create subject"
        });

    }

};

// Update subject
export const editSubject = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        const subject = await updateSubject(id, req.body);

        res.status(200).json({
            message: "Subject updated successfully",
            subject
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update subject"
        });

    }

};

// Delete subject
export const removeSubject = async (req: Request, res: Response) => {

    try {

        const id = Number(req.params.id);

        await deleteSubject(id);

        res.status(200).json({
            message: "Subject deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete subject"
        });

    }

};