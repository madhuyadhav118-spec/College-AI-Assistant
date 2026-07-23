import prisma from "../config/prisma";

// Get all timetable entries
export const getAllTimetable = async () => {
    return await prisma.timetable.findMany({
        include: {
            subjects: true,
            faculty: true,
            departments: true
        }
    });
};

// Get one timetable entry
export const getTimetableById = async (id: number) => {
    return await prisma.timetable.findUnique({
        where: {
            timetable_id: id
        },
        include: {
            subjects: true,
            faculty: true,
            departments: true
        }
    });
};

// Create timetable entry
export const createTimetable = async (data: any) => {
    return await prisma.timetable.create({
        data
    });
};

// Update timetable entry
export const updateTimetable = async (
    id: number,
    data: any
) => {
    return await prisma.timetable.update({
        where: {
            timetable_id: id
        },
        data
    });
};

// Delete timetable entry
export const deleteTimetable = async (id: number) => {
    return await prisma.timetable.delete({
        where: {
            timetable_id: id
        }
    });
};