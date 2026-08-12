export type AttendanceStatus =
    | "PRESENT"
    | "ABSENT"
    | "LATE";


export interface Attendance {
    attendance_id: number;

    student_id: number;
    faculty_id: number;

    attendance_date: string;

    status?: AttendanceStatus;

    remarks?: string | null;

    created_at?: string;
    updated_at?: string;
}


export interface AttendanceFormData {
    student_id: number;
    faculty_id: number;

    attendance_date: string;

    status: AttendanceStatus;

    remarks?: string;
}