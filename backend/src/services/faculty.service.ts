import prisma from "../config/prisma";

// Get all faculty
export const getAllFaculty = async () => {
    return await prisma.faculty.findMany({
        include: {
            users: true,
            departments: true
        }
    });
};

// Get one faculty
export const getFacultyById = async (id: number) => {
    return await prisma.faculty.findUnique({
        where: {
            faculty_id: id
        },
        include: {
            users: true,
            departments: true
        }
    });
};

// Create faculty
export const createFaculty = async (data: any) => {
    return await prisma.faculty.create({
        data
    });
};

// Update faculty
export const updateFaculty = async (
    id: number,
    data: any
) => {
    return await prisma.faculty.update({
        where: {
            faculty_id: id
        },
        data
    });
};

// Delete faculty
export const deleteFaculty = async (id: number) => {
    return await prisma.faculty.delete({
        where: {
            faculty_id: id
        }
    });
};