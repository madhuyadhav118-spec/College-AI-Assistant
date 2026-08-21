import api from "../api/axios";
import type { NoticeFormData } from "../types/notice";

export const getAllNotices = async () => {
    const response = await api.get("/notices");
    return response.data;
};

export const getNoticeById = async (id: string) => {
    const response = await api.get(`/notices/${id}`);
    return response.data;
};

export const addNotice = async (data: NoticeFormData) => {
    const response = await api.post("/notices", data);
    return response.data;
};

export const updateNotice = async (
    id: string,
    data: NoticeFormData
) => {
    const response = await api.put(`/notices/${id}`, data);
    return response.data;
};

export const deleteNotice = async (id: string) => {
    const response = await api.delete(`/notices/${id}`);
    return response.data;
};