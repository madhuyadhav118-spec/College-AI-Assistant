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

    // Step 1: Create User
    const user = await prisma.users.create({

        data: {

            full_name: data.full_name,
            email: data.email,

            // Temporary password
            password: "Student@123",

            role: "STUDENT",

            phone: data.phone

        }

    });

    const department = await prisma.departments.findFirst({
        where: {
            department_code: data.department
        }
    });

    // Step 2: Create Student
    return await prisma.students.create({

        data: {

            user_id: user.user_id,

            roll_number: data.roll_number,

            department: data.department,

            department_id: department?.department_id ?? null,

            year: data.year,

            semester: data.semester,

            status: data.status

        },

        include: {

            users: true,
            departments: true

        }

    });

};


export const updateStudent = async (id: number, data: any) => {

    const student = await prisma.students.findUnique({
        where: {
            student_id: id
        }
    });

    if (!student) {
        throw new Error("Student not found");
    }

    return await prisma.students.update({

        where: {
            student_id: id
        },

        data: {

            roll_number: data.roll_number,
            year: data.year,
            semester: data.semester,
            status: data.status,

            users: {
                update: {
                    full_name: data.full_name,
                    email: data.email,
                    phone: data.phone
                }
            }

        },

        include: {
            users: true,
            departments: true
        }

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