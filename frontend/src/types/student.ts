export interface Student {

    student_id: number;

    user_id: number;

    roll_number: string;

    admission_number: string | null;

    department: string;

    year: number;

    semester: number;

    section: string | null;

    gender: string | null;

    date_of_birth: string | null;

    address: string | null;

    parent_name: string | null;

    parent_phone: string | null;

    blood_group: string | null;

    admission_date: string | null;

    status: string;

    department_id: number | null;

    users: {

        user_id: number;

        full_name: string;

        email: string;

        phone: string | null;

        role: string;

    };

    departments: {

        department_id: number;

        department_name: string;

        department_code: string;

    } | null;

}