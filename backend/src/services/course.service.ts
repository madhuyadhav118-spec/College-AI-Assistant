import prisma from "../config/prisma";

// Get all courses
export const getAllCourses = async () => {
    return await prisma.courses.findMany({
        include: {
            departments: true
        }
    });
};

// Get one course
export const getCourseById = async (id: number) => {
    return await prisma.courses.findUnique({
        where: {
            course_id: id
        },
         include: {
            departments: true
        }
    });
};

// Create course
export const createCourse = async (data: any) => {
    return await prisma.courses.create({
        data
    });
};

// Update course
export const updateCourse = async (
    id: number,
    data: any
) => {
    return await prisma.courses.update({
        where: {
            course_id: id
        },
        data
    });
};

// Delete course
export const deleteCourse = async (id: number) => {
    return await prisma.courses.delete({
        where: {
            course_id: id
        }
    });
};