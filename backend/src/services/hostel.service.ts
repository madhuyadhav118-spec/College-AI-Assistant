import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all hostel rooms
export const getAllRooms = async () => {
    return await prisma.hostel_rooms.findMany({
        orderBy: {
            room_number: "asc"
        }
    });
};

// Get room by ID
export const getRoomById = async (id: number) => {
    return await prisma.hostel_rooms.findUnique({
        where: {
            room_id: id
        }
    });
};

// Create hostel room
export const createRoom = async (data: any) => {
    return await prisma.hostel_rooms.create({
        data
    });
};

// Update hostel room
export const updateRoom = async (
    id: number,
    data: any
) => {
    return await prisma.hostel_rooms.update({
        where: {
            room_id: id
        },
        data
    });
};

// Delete hostel room
export const deleteRoom = async (id: number) => {
    return await prisma.hostel_rooms.delete({
        where: {
            room_id: id
        }
    });
};