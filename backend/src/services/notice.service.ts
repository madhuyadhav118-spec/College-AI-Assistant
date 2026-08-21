import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all notices
export const getAllNotices = async () => {

    const notices = await prisma.notices.findMany({
        orderBy: {
            publish_date: "desc"
        }
    });

    return notices.map(notice => ({
        notice_id: notice.notice_id,
        title: notice.title,
        content: notice.description,
        target_audience: notice.audience,
        publish_date: notice.publish_date,
        expiry_date: notice.expiry_date,
        created_at: notice.created_at,
        updated_at: notice.updated_at
    }));
};

// Get notice by ID
export const getNoticeById = async (id: number) => {

    const notice = await prisma.notices.findUnique({
        where: {
            notice_id: id
        }
    });

    if (!notice) {
        return null;
    }

    return {
        notice_id: notice.notice_id,
        title: notice.title,
        content: notice.description,
        target_audience: notice.audience,
        publish_date: notice.publish_date,
        expiry_date: notice.expiry_date,
        created_at: notice.created_at,
        updated_at: notice.updated_at
    };
};

// Create notice
export const createNotice = async (data: any) => {

    return await prisma.notices.create({

        data: {

            title: data.title,

            description: data.content,

            audience: data.target_audience,

            publish_date: new Date(data.publish_date),

            expiry_date: data.expiry_date
                ? new Date(data.expiry_date)
                : null

        }

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

        data: {

            title: data.title,

            description: data.content,

            audience: data.target_audience,

            publish_date: new Date(data.publish_date),

            expiry_date: data.expiry_date
                ? new Date(data.expiry_date)
                : null

        }

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