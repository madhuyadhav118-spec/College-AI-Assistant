import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all results
export const getAllResults = async () => {
    return await prisma.results.findMany({
        include: {
            students: true,
            subjects: true,
            examinations: true
        }
    });
};

// Get result by ID
export const getResultById = async (id: number) => {
    return await prisma.results.findUnique({
        where: {
            result_id: id
        },
        include: {
            students: true,
            subjects: true,
            examinations: true
        }
    });
};

// Create result
// Create result
export const createResult = async (data: any) => {

    return await prisma.results.create({

        data: {

            marks_obtained: data.marks_obtained,

            grade: data.grade,

            remarks: data.remarks || null,

            result_status: data.result_status || "PASS",

            students: {
                connect: {
                    student_id: data.student_id
                }
            },

            subjects: {
                connect: {
                    subject_id: data.subject_id
                }
            },

            examinations: {
                connect: {
                    exam_id: data.exam_id
                }
            }

        }

    });

};

// Update result
export const updateResult = async (
    id: number,
    data: any
) => {
    return await prisma.results.update({
        where: {
            result_id: id
        },
        data
    });
};

// Delete result
export const deleteResult = async (id: number) => {
    return await prisma.results.delete({
        where: {
            result_id: id
        }
    });
};