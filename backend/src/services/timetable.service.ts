import prisma from "../config/prisma";

type TimetableDay =
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday";

interface TimetableInput {
    subject_id: number;
    faculty_id: number;
    department_id: number;
    day_of_week: TimetableDay;
    start_time: string;
    end_time: string;
    room_number?: string | null;
}


// Get all timetable entries
export const getAllTimetables = async () => {
    return await prisma.timetable.findMany({
        include: {
            subjects: true,
            faculty: {
                include: {
                    users: true
                }
            },
            departments: true
        }
    });
};


// Get one timetable entry
export const getTimetableById = async (id: number) => {
    return await prisma.timetable.findUnique({
        where: {
            timetable_id: id
        },
        include: {
            subjects: true,
            faculty: {
                include: {
                    users: true
                }
            },
            departments: true
        }
    });
};


// Create timetable entry
export const createTimetable = async (
    data: TimetableInput
) => {
    return await prisma.timetable.create({
        data: {
            subject_id: data.subject_id,
            faculty_id: data.faculty_id,
            department_id: data.department_id,

            day_of_week: data.day_of_week,

            start_time: new Date(
                `1970-01-01T${data.start_time}:00.000Z`
            ),

            end_time: new Date(
                `1970-01-01T${data.end_time}:00.000Z`
            ),

            room_number: data.room_number || null
        },

        include: {
            subjects: true,

            faculty: {
                include: {
                    users: true
                }
            },

            departments: true
        }
    });
};


// Update timetable entry
export const updateTimetable = async (
    id: number,
    data: TimetableInput
) => {
    return await prisma.timetable.update({
        where: {
            timetable_id: id
        },

        data: {
            subject_id: data.subject_id,
            faculty_id: data.faculty_id,
            department_id: data.department_id,

            day_of_week: data.day_of_week,

            start_time: new Date(
                `1970-01-01T${data.start_time}:00.000Z`
            ),

            end_time: new Date(
                `1970-01-01T${data.end_time}:00.000Z`
            ),

            room_number: data.room_number || null
        },

        include: {
            subjects: true,

            faculty: {
                include: {
                    users: true
                }
            },

            departments: true
        }
    });
};


// Delete timetable entry
export const deleteTimetable = async (
    id: number
) => {
    return await prisma.timetable.delete({
        where: {
            timetable_id: id
        }
    });
};