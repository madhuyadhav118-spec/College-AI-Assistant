import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all assignments
export const getAllAssignments = async () => {
    return await prisma.assignments.findMany({
        include: {
            subjects: true,
            faculty: true
        },
        orderBy: {
            due_date: "asc"
        }
    });
};

// Get assignment by ID
export const getAssignmentById = async (id: number) => {
    return await prisma.assignments.findUnique({
        where: {
            assignment_id: id
        },
        include: {
            subjects: true,
            faculty: true
        }
    });
};

// Create assignment
export const createAssignment = async (data: any) => {
    return await prisma.assignments.create({
        data
    });
};

// Update assignment
export const updateAssignment = async (
    id: number,
    data: any
) => {
    return await prisma.assignments.update({
        where: {
            assignment_id: id
        },
        data
    });
};

// Delete assignment
export const deleteAssignment = async (id: number) => {
    return await prisma.assignments.delete({
        where: {
            assignment_id: id
        }
    });
};