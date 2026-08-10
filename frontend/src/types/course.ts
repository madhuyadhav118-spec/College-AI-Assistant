export interface Course {
    course_id: number;
    course_name: string;
    course_code: string;
    duration_years: number;
    created_at?: string;
    updated_at?: string;
}

export interface CourseFormData {
    course_name: string;
    course_code: string;
    duration_years: number;
}