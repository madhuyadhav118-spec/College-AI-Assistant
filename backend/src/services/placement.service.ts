import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all placements
export const getAllPlacements = async () => {
    return await prisma.placements.findMany({
        orderBy: {
            drive_date: "desc"
        }
    });
};

// Get placement by ID
export const getPlacementById = async (id: number) => {
    return await prisma.placements.findUnique({
        where: {
            placement_id: id
        }
    });
};

// Create placement
export const createPlacement = async (data: any) => {
    return await prisma.placements.create({
        data
    });
};

// Update placement
export const updatePlacement = async (
    id: number,
    data: any
) => {
    return await prisma.placements.update({
        where: {
            placement_id: id
        },
        data
    });
};

// Delete placement
export const deletePlacement = async (id: number) => {
    return await prisma.placements.delete({
        where: {
            placement_id: id
        }
    });
};