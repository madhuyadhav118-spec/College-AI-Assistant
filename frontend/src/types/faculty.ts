export interface Faculty {
    faculty_id: number;
    user_id: number;
    employee_id: string;
    department: string;
    designation?: string | null;
    qualification?: string | null;
    experience?: number | null;
    joining_date?: string | null;
    office_phone?: string | null;
    status?: "ACTIVE" | "INACTIVE" | null;
    created_at?: string | null;
    updated_at?: string | null;
    department_id?: number | null;

    users?: {
        user_id: number;
        full_name: string;
        email: string;
        phone?: string | null;
    };

    departments?: {
        department_id: number;
        department_name: string;
        department_code: string;
    };
}

export interface FacultyFormData {
    full_name: string;
    email: string;
    phone: string;
    employee_id: string;
    department: string;
    designation: string;
    qualification: string;
    experience: number;
    joining_date: string;
    office_phone: string;
    status: "ACTIVE" | "INACTIVE";
    department_id?: number;
}