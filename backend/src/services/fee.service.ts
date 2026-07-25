import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all fees
export const getAllFees = async () => {
    return await prisma.fees.findMany({
        include: {
            students: true
        }
    });
};

// Get fee by ID
export const getFeeById = async (id: number) => {
    return await prisma.fees.findUnique({
        where: {
            fee_id: id
        },
        include: {
            students: true
        }
    });
};

// Create fee
export const createFee = async (data: any) => {
    return await prisma.fees.create({
        data
    });
};

// Update fee
export const updateFee = async (
    id: number,
    data: any
) => {
    return await prisma.fees.update({
        where: {
            fee_id: id
        },
        data
    });
};

// Delete fee
export const deleteFee = async (id: number) => {
    return await prisma.fees.delete({
        where: {
            fee_id: id
        }
    });
};