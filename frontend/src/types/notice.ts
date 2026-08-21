export interface Notice {
    notice_id: number;
    title: string;
    content: string;
    target_audience: string;
    publish_date?: string;
    expiry_date?: string;
    created_by?: number;
    created_at?: string;
    updated_at?: string;
}

export interface NoticeFormData {
    title: string;
    content: string;
    target_audience: string;
    publish_date?: string;
    expiry_date?: string;
    created_by?: number;
}