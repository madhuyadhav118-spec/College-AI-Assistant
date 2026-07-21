import prisma from "../config/prisma";

// Get all subjects
export const getAllSubjects = async () => {
    return await prisma.subjects.findMany({
        include: {
            departments: true
        }
    });
};

// Get one subject
export const getSubjectById = async (id: number) => {
    return await prisma.subjects.findUnique({
        where: {
            subject_id: id
        },
        include: {
            departments: true
        }
    });
};

// Create subject
export const createSubject = async (data: any) => {
    return await prisma.subjects.create({
        data
    });
};

// Update subject
export const updateSubject = async (
    id: number,
    data: any
) => {
    return await prisma.subjects.update({
        where: {
            subject_id: id
        },
        data
    });
};

// Delete subject
export const deleteSubject = async (id: number) => {
    return await prisma.subjects.delete({
        where: {
            subject_id: id
        }
    });
};