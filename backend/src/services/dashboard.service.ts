import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAdminDashboard = async () => {

    const totalStudents =
        await prisma.students.count();

    const totalFaculty =
        await prisma.faculty.count();

    const totalDepartments =
        await prisma.departments.count();

    const totalSubjects =
        await prisma.subjects.count();

    const totalBooks =
        await prisma.library_books.count();

    const totalPlacements =
        await prisma.placements.count();

    const totalNotices =
        await prisma.notices.count();

    const totalEvents =
        await prisma.events.count();

    return {

        totalStudents,

        totalFaculty,

        totalDepartments,

        totalSubjects,

        totalBooks,

        totalPlacements,

        totalNotices,

        totalEvents

    };

};