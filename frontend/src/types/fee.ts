export interface Fee {
    fee_id: number;
    student_id: number;
    academic_year: string;
    semester: number;
    total_fee: number;
    amount_paid: number;
    balance: number;
    due_date?: string;
    payment_status?: string;
    remarks?: string;
    created_at?: string;
    updated_at?: string;
}

export interface FeeFormData {
    student_id: number;
    academic_year: string;
    semester: number;
    total_fee: number;
    amount_paid: number;
    balance: number;
    due_date?: string;
    payment_status?: string;
    remarks?: string;
}