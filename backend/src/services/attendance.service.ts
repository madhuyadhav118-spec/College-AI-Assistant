import prisma from "../config/prisma";

// Get all attendance
export const getAllAttendance = async () => {
    return await prisma.attendance.findMany({
        include: {
            students: true,
            faculty: true
        }
    });
};

// Get one attendance
export const getAttendanceById = async (id: number) => {
    return await prisma.attendance.findUnique({
        where: {
            attendance_id: id
        },
        include: {
            students: true,
            faculty: true
        }
    });
};

// Create attendance
export const createAttendance = async (data: any) => {
    return await prisma.attendance.create({
        data
    });
};

// Update attendance
export const updateAttendance = async (
    id: number,
    data: any
) => {
    return await prisma.attendance.update({
        where: {
            attendance_id: id
        },
        data
    });
};

// Delete attendance
export const deleteAttendance = async (id: number) => {
    return await prisma.attendance.delete({
        where: {
            attendance_id: id
        }
    });
};