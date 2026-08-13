export type ExamType =
    | "MID1"
    | "MID2"
    | "SEMESTER"
    | "LAB"
    | "PRACTICAL";


export interface Examination {
    exam_id: number;

    subject_id: number;

    exam_name: string;

    exam_type: ExamType;

    exam_date: string;

    start_time: string;

    end_time: string;

    venue?: string | null;

    total_marks?: number | null;

    created_at?: string;

    updated_at?: string;
}


export interface ExaminationFormData {
    subject_id: number;

    exam_name: string;

    exam_type: ExamType;

    exam_date: string;

    start_time: string;

    end_time: string;

    venue?: string;

    total_marks?: number;
}

// Data actually sent to backend
export interface ExaminationRequestData {
    subject_id: number;
    exam_name: string;
    exam_type: ExamType;
    exam_date: string;
    start_time: string;
    end_time: string;
    venue?: string | null;
    total_marks?: number;
}