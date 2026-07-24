import prisma from "../config/prisma";

// Get all examinations
export const getAllExaminations = async () => {
    return await prisma.examinations.findMany({
        include: {
            subjects: true
        }
    });
};

// Get examination by ID
export const getExaminationById = async (id: number) => {
    return await prisma.examinations.findUnique({
        where: {
            exam_id: id
        },
        include: {
            subjects: true
        }
    });
};

// Create examination
export const createExamination = async (data: any) => {
    return await prisma.examinations.create({
        data
    });
};

// Update examination
export const updateExamination = async (id: number, data: any) => {
    return await prisma.examinations.update({
        where: {
            exam_id: id
        },
        data
    });
};

// Delete examination
export const deleteExamination = async (id: number) => {
    return await prisma.examinations.delete({
        where: {
            exam_id: id
        }
    });
};