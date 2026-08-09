import prisma from "../config/prisma";

interface FacultyData {
full_name: string;
email: string;
phone?: string;


employee_id: string;

department: string;
department_id?: number | null;

designation?: string;
qualification?: string;

experience?: number | string | null;

joining_date?: string | null;

office_phone?: string;

status?: "ACTIVE" | "INACTIVE";


}

// Get all faculty
export const getAllFaculty = async () => {


return await prisma.faculty.findMany({

    include: {
        users: true,
        departments: true
    }

});


};

// Get one faculty
export const getFacultyById = async (id: number) => {


return await prisma.faculty.findUnique({

    where: {
        faculty_id: id
    },

    include: {
        users: true,
        departments: true
    }

});


};

// Create faculty
export const createFaculty = async (data: FacultyData) => {


// Step 1: Create User
const user = await prisma.users.create({

    data: {

        full_name: data.full_name,

        email: data.email,

        // Temporary password
        password: "Faculty@123",

        role: "FACULTY",

        phone: data.phone

    }

});


// Step 2: Find department
let departmentId = data.department_id ?? null;

if (!departmentId && data.department) {

    const department = await prisma.departments.findFirst({

        where: {
            department_name: data.department
        }

    });

    departmentId = department?.department_id ?? null;

}


// Step 3: Create Faculty
return await prisma.faculty.create({

    data: {

        user_id: user.user_id,

        employee_id: data.employee_id,

        department: data.department,

        department_id: departmentId,

        designation: data.designation,

        qualification: data.qualification,

        experience:
            data.experience !== undefined &&
            data.experience !== null &&
            data.experience !== ""
                ? Number(data.experience)
                : null,

        joining_date:
            data.joining_date
                ? new Date(data.joining_date)
                : null,

        office_phone: data.office_phone,

        status: data.status || "ACTIVE"

    },

    include: {

        users: true,

        departments: true

    }

});


};

// Update faculty
export const updateFaculty = async (
id: number,
data: FacultyData
) => {


// Find faculty
const faculty = await prisma.faculty.findUnique({
    where: {
        faculty_id: id
    }
});

if (!faculty) {
    throw new Error("Faculty not found");
}


// Step 1: Update User details
await prisma.users.update({

    where: {
        user_id: faculty.user_id
    },

    data: {

        full_name: data.full_name,

        email: data.email,

        phone: data.phone

    }

});


// Step 2: Update Faculty details
return await prisma.faculty.update({

    where: {
        faculty_id: id
    },

    data: {

        employee_id: data.employee_id,

        department: data.department,

        department_id: data.department_id ?? null,

        designation: data.designation,

        qualification: data.qualification,

        experience:
            data.experience !== undefined &&
            data.experience !== null &&
            data.experience !== ""
                ? Number(data.experience)
                : null,

        joining_date:
            data.joining_date
                ? new Date(data.joining_date)
                : null,

        office_phone: data.office_phone,

        status: data.status

    },

    include: {

        users: true,

        departments: true

    }

});


};

// Delete faculty
export const deleteFaculty = async (id: number) => {


return await prisma.faculty.delete({

    where: {
        faculty_id: id
    }

});


};
