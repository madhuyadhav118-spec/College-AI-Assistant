import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all leave requests
export const getAllLeaves = async () => {
    return await prisma.leave_requests.findMany({
        include: {
            users: true
        },
        orderBy: {
            created_at: "desc"
        }
    });
};

// Get leave request by ID
export const getLeaveById = async (id: number) => {
    return await prisma.leave_requests.findUnique({
        where: {
            leave_id: id
        },
        include: {
            users: true
        }
    });
};

// Create leave request
export const createLeave = async (data: any) => {
    return await prisma.leave_requests.create({
        data
    });
};

// Update leave request
export const updateLeave = async (
    id: number,
    data: any
) => {
    return await prisma.leave_requests.update({
        where: {
            leave_id: id
        },
        data
    });
};

// Delete leave request
export const deleteLeave = async (id: number) => {
    return await prisma.leave_requests.delete({
        where: {
            leave_id: id
        }
    });
};