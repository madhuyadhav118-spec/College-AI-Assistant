import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all events
export const getAllEvents = async () => {
    return await prisma.events.findMany({
        orderBy: {
            event_date: "asc"
        }
    });
};

// Get event by ID
export const getEventById = async (id: number) => {
    return await prisma.events.findUnique({
        where: {
            event_id: id
        }
    });
};

// Create event
export const createEvent = async (data: any) => {
    return await prisma.events.create({
        data
    });
};

// Update event
export const updateEvent = async (
    id: number,
    data: any
) => {
    return await prisma.events.update({
        where: {
            event_id: id
        },
        data
    });
};

// Delete event
export const deleteEvent = async (id: number) => {
    return await prisma.events.delete({
        where: {
            event_id: id
        }
    });
};