import api from "../api/axios";
import type { FeeFormData } from "../types/fee";

export const getAllFees = async () => {
    const response = await api.get("/fees");
    return response.data;
};

export const getFeeById = async (id: string) => {
    const response = await api.get(`/fees/${id}`);
    return response.data;
};

export const addFee = async (data: FeeFormData) => {
    const response = await api.post("/fees", data);
    return response.data;
};

export const updateFee = async (
    id: string,
    data: FeeFormData
) => {
    const response = await api.put(`/fees/${id}`, data);
    return response.data;
};

export const deleteFee = async (id: string) => {
    const response = await api.delete(`/fees/${id}`);
    return response.data;
};