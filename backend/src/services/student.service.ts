import prisma from "../config/prisma";

// Get all students
export const getAllStudents = async () => {
    return await prisma.students.findMany({
        include: {
            users: true,
            departments: true
        }
    });
};

// Get one student
export const getStudentById = async (id: number) => {
    return await prisma.students.findUnique({
        where: {
            student_id: id
        },
        include: {
            users: true,
            departments: true
        }
    });
};

// Create a new student
export const createStudent = async (data: any) => {
    return await prisma.students.create({
        data
    });
};

// Update a student
export const updateStudent = async (id: number, data: any) => {
    return await prisma.students.update({
        where: {
            student_id: id
        },
        data
    });
};

// Delete a student
export const deleteStudent = async (id: number) => {
    return await prisma.students.delete({
        where: {
            student_id: id
        }
    });
};