export interface Department {
    department_id: number;
    department_name: string;
    department_code: string;
    hod_name: string;
    email?: string;
    phone?: string;
    building_name?: string;
    course_id?: number | null;
    created_at?: string;
    updated_at?: string;
}

export interface DepartmentFormData {
    department_name: string;
    department_code: string;
    hod_name: string;
    email?: string;
    phone?: string;
    building_name?: string;
}