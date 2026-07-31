import { Request, Response } from "express";

import {
    getAllRooms,
    getRoomById,
    createRoom,
    updateRoom,
    deleteRoom
} from "../services/hostel.service";

// Get all rooms
export const getRooms = async (req: Request, res: Response) => {
    try {

        const rooms = await getAllRooms();

        res.status(200).json(rooms);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch hostel rooms"
        });

    }
};

// Get room by ID
export const getOneRoom = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const room = await getRoomById(id);

        if (!room) {
            return res.status(404).json({
                message: "Hostel room not found"
            });
        }

        res.status(200).json(room);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });

    }
};

// Create room
export const addRoom = async (req: Request, res: Response) => {
    try {

        const room = await createRoom(req.body);

        res.status(201).json({
            message: "Hostel room created successfully",
            room
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create hostel room",
            error: error instanceof Error ? error.message : error
        });

    }
};

// Update room
export const editRoom = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const room = await updateRoom(id, req.body);

        res.status(200).json({
            message: "Hostel room updated successfully",
            room
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update hostel room"
        });

    }
};

// Delete room
export const removeRoom = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteRoom(id);

        res.status(200).json({
            message: "Hostel room deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete hostel room"
        });

    }
};