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

        data: {

            academic_year: data.academic_year,

            semester: data.semester,

            total_fee: data.total_fee,

            amount_paid: data.amount_paid ?? 0,

            balance: data.balance,

            due_date: data.due_date,

            payment_status: data.payment_status || "PENDING",

            remarks: data.remarks || null,

            students: {
                connect: {
                    student_id: data.student_id
                }
            }

        }

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

        data: {

            academic_year: data.academic_year,

            semester: data.semester,

            total_fee: data.total_fee,

            amount_paid: data.amount_paid,

            balance: data.balance,

            due_date: data.due_date,

            payment_status: data.payment_status,

            remarks: data.remarks,

            students: {
                connect: {
                    student_id: data.student_id
                }
            }

        }

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