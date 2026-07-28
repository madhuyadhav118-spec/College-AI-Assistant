import { Request, Response } from "express";

import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "../services/event.service";

// Get all events
export const getEvents = async (req: Request, res: Response) => {
    try {

        const events = await getAllEvents();

        res.status(200).json(events);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch events"
        });
    }
};

// Get event by ID
export const getOneEvent = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const event = await getEventById(id);

        if (!event) {
            return res.status(404).json({
                message: "Event not found"
            });
        }

        res.status(200).json(event);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
};

// Create event
export const addEvent = async (req: Request, res: Response) => {
    try {

        const event = await createEvent(req.body);

        res.status(201).json({
            message: "Event created successfully",
            event
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create event",
            error: error instanceof Error ? error.message : error
        });
    }
};

// Update event
export const editEvent = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        const event = await updateEvent(id, req.body);

        res.status(200).json({
            message: "Event updated successfully",
            event
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update event"
        });
    }
};

// Delete event
export const removeEvent = async (req: Request, res: Response) => {
    try {

        const id = Number(req.params.id);

        await deleteEvent(id);

        res.status(200).json({
            message: "Event deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete event"
        });
    }
};