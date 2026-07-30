import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all applications
export const getAllApplications = async () => {
    return await prisma.placement_applications.findMany({
        include: {
            placements: true,
            students: true
        },
        orderBy: {
            applied_date: "desc"
        }
    });
};

// Get application by ID
export const getApplicationById = async (id: number) => {
    return await prisma.placement_applications.findUnique({
        where: {
            application_id: id
        },
        include: {
            placements: true,
            students: true
        }
    });
};

// Apply for placement
export const createApplication = async (data: any) => {
    return await prisma.placement_applications.create({
        data
    });
};

// Update application
export const updateApplication = async (
    id: number,
    data: any
) => {
    return await prisma.placement_applications.update({
        where: {
            application_id: id
        },
        data
    });
};

// Delete application
export const deleteApplication = async (id: number) => {
    return await prisma.placement_applications.delete({
        where: {
            application_id: id
        }
    });
};