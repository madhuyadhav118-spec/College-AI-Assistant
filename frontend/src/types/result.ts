export interface Result {
    result_id: number;
    student_id: number;
    subject_id: number;
    exam_id: number;
    marks_obtained: number;
    grade: string;
    created_at?: string;
    updated_at?: string;
}

export interface ResultFormData {
    student_id: number;
    subject_id: number;   // ← Add this line
    exam_id: number;
    marks_obtained: number;
    grade: string;
}