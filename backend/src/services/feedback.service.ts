import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all feedback
export const getAllFeedback = async () => {
    return await prisma.feedback.findMany({
        include: {
            students: true
        },
        orderBy: {
            created_at: "desc"
        }
    });
};

// Get feedback by ID
export const getFeedbackById = async (id: number) => {
    return await prisma.feedback.findUnique({
        where: {
            feedback_id: id
        },
        include: {
            students: true
        }
    });
};

// Create feedback
export const createFeedback = async (data: any) => {
    return await prisma.feedback.create({
        data
    });
};

// Update feedback
export const updateFeedback = async (
    id: number,
    data: any
) => {
    return await prisma.feedback.update({
        where: {
            feedback_id: id
        },
        data
    });
};

// Delete feedback
export const deleteFeedback = async (id: number) => {
    return await prisma.feedback.delete({
        where: {
            feedback_id: id
        }
    });
};