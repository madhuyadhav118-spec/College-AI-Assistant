import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all submissions
export const getAllSubmissions = async () => {
    return await prisma.assignment_submissions.findMany({
        include: {
            assignments: true,
            students: true
        },
        orderBy: {
            submission_date: "desc"
        }
    });
};

// Get submission by ID
export const getSubmissionById = async (id: number) => {
    return await prisma.assignment_submissions.findUnique({
        where: {
            submission_id: id
        },
        include: {
            assignments: true,
            students: true
        }
    });
};

// Create submission
export const createSubmission = async (data: any) => {
    return await prisma.assignment_submissions.create({
        data
    });
};

// Update submission
export const updateSubmission = async (
    id: number,
    data: any
) => {
    return await prisma.assignment_submissions.update({
        where: {
            submission_id: id
        },
        data
    });
};

// Delete submission
export const deleteSubmission = async (id: number) => {
    return await prisma.assignment_submissions.delete({
        where: {
            submission_id: id
        }
    });
};