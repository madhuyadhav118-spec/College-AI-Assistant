import prisma from "../config/prisma";
import type { Prisma } from "@prisma/client";

interface AttendanceInput {
    student_id: number;
    faculty_id: number;
    attendance_date: string;
    status?: "PRESENT" | "ABSENT" | "LATE";
    remarks?: string | null;
}


// Get all attendance
export const getAllAttendance = async () => {
    return await prisma.attendance.findMany({
        include: {
            students: true,
            faculty: true
        }
    });
};


// Get one attendance
export const getAttendanceById = async (id: number) => {
    return await prisma.attendance.findUnique({
        where: {
            attendance_id: id
        },
        include: {
            students: true,
            faculty: true
        }
    });
};


// Create attendance
export const createAttendance = async (
    data: AttendanceInput
) => {

    const attendanceData: Prisma.attendanceCreateInput = {
        attendance_date: new Date(
            `${data.attendance_date}T00:00:00.000Z`
        ),

        status: data.status ?? "PRESENT",

        remarks: data.remarks || null,

        students: {
            connect: {
                student_id: Number(data.student_id)
            }
        },

        faculty: {
            connect: {
                faculty_id: Number(data.faculty_id)
            }
        }
    };

    return await prisma.attendance.create({
        data: attendanceData,

        include: {
            students: true,
            faculty: true
        }
    });
};


// Update attendance
export const updateAttendance = async (
    id: number,
    data: AttendanceInput
) => {

    const attendanceData: Prisma.attendanceUpdateInput = {
        attendance_date: new Date(
            `${data.attendance_date}T00:00:00.000Z`
        ),

        status: data.status ?? "PRESENT",

        remarks: data.remarks || null,

        students: {
            connect: {
                student_id: Number(data.student_id)
            }
        },

        faculty: {
            connect: {
                faculty_id: Number(data.faculty_id)
            }
        }
    };

    return await prisma.attendance.update({
        where: {
            attendance_id: id
        },

        data: attendanceData,

        include: {
            students: true,
            faculty: true
        }
    });
};


// Delete attendance
export const deleteAttendance = async (
    id: number
) => {

    return await prisma.attendance.delete({
        where: {
            attendance_id: id
        }
    });
};