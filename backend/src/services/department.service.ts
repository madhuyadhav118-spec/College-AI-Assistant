import prisma from "../config/prisma";

// Get all departments
export const getAllDepartments = async () => {
    return await prisma.departments.findMany();
};

// Get one department
export const getDepartmentById = async (id: number) => {
    return await prisma.departments.findUnique({
        where: {
            department_id: id
        }
    });
};

// Create department
export const createDepartment = async (data: any) => {
    return await prisma.departments.create({
        data
    });
};

// Update department
export const updateDepartment = async (
    id: number,
    data: any
) => {
    return await prisma.departments.update({
        where: {
            department_id: id
        },
        data
    });
};

// Delete department
export const deleteDepartment = async (id: number) => {
    return await prisma.departments.delete({
        where: {
            department_id: id
        }
    });
};