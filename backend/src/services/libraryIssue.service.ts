import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all issued books
export const getAllIssues = async () => {
    return await prisma.library_issues.findMany({
        include: {
            library_books: true,
            students: true
        },
        orderBy: {
            issue_date: "desc"
        }
    });
};

// Get issue by ID
export const getIssueById = async (id: number) => {
    return await prisma.library_issues.findUnique({
        where: {
            issue_id: id
        },
        include: {
            library_books: true,
            students: true
        }
    });
};

// Issue a book
export const createIssue = async (data: any) => {
    return await prisma.library_issues.create({
        data
    });
};

// Update issue
export const updateIssue = async (
    id: number,
    data: any
) => {
    return await prisma.library_issues.update({
        where: {
            issue_id: id
        },
        data
    });
};

// Delete issue
export const deleteIssue = async (id: number) => {
    return await prisma.library_issues.delete({
        where: {
            issue_id: id
        }
    });
};