import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all notices
export const getAllNotices = async () => {
    return await prisma.notices.findMany({
        orderBy: {
            publish_date: "desc"
        }
    });
};

// Get notice by ID
export const getNoticeById = async (id: number) => {
    return await prisma.notices.findUnique({
        where: {
            notice_id: id
        }
    });
};

// Create notice
export const createNotice = async (data: any) => {
    return await prisma.notices.create({
        data
    });
};

// Update notice
export const updateNotice = async (
    id: number,
    data: any
) => {
    return await prisma.notices.update({
        where: {
            notice_id: id
        },
        data
    });
};

// Delete notice
export const deleteNotice = async (id: number) => {
    return await prisma.notices.delete({
        where: {
            notice_id: id
        }
    });
};