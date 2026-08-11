export type TimetableDay =
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";


export interface TimetableSubject {
    subject_id: number;
    subject_name: string;
    subject_code: string;
    department_id: number;
    semester?: number;
    year?: number;
    credits?: number;
}


export interface TimetableFaculty {
    faculty_id: number;
    user_id?: number;
    employee_id: string;
    department_id: number;
    designation: string;
    qualification?: string;
    experience?: number;
    status?: string;
}


export interface TimetableDepartment {
    department_id: number;
    department_name: string;
    department_code: string;
    hod_name?: string | null;
    email?: string | null;
    phone?: string | null;
}


export interface Timetable {
    timetable_id: number;

    subject_id: number;
    faculty_id: number;
    department_id: number;

    day_of_week: TimetableDay;

    start_time: string;
    end_time: string;

    room_number?: string | null;

    created_at?: string;
    updated_at?: string;

    subjects?: TimetableSubject;
    faculty?: TimetableFaculty;
    departments?: TimetableDepartment;
}


export interface TimetableFormData {
    subject_id: number;
    faculty_id: number;
    department_id: number;

    day_of_week: TimetableDay;

    start_time: string;
    end_time: string;

    room_number?: string;
}