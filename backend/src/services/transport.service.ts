import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all buses
export const getAllBuses = async () => {
    return await prisma.transport_buses.findMany({
        orderBy: {
            bus_number: "asc"
        }
    });
};

// Get bus by ID
export const getBusById = async (id: number) => {
    return await prisma.transport_buses.findUnique({
        where: {
            bus_id: id
        }
    });
};

// Create bus
export const createBus = async (data: any) => {
    return await prisma.transport_buses.create({
        data
    });
};

// Update bus
export const updateBus = async (
    id: number,
    data: any
) => {
    return await prisma.transport_buses.update({
        where: {
            bus_id: id
        },
        data
    });
};

// Delete bus
export const deleteBus = async (id: number) => {
    return await prisma.transport_buses.delete({
        where: {
            bus_id: id
        }
    });
};