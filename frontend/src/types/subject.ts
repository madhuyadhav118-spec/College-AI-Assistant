export interface Subject {
    subject_id: number;
    subject_name: string;
    subject_code: string;
    department_id: number;
    semester: number;
    year: number;
    credits: number;
    created_at?: string;
    updated_at?: string;
}

export interface SubjectFormData {
    subject_name: string;
    subject_code: string;
    department_id: number;
    semester: number;
    year: number;
    credits: number;
}