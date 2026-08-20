import api from "../api/axios";

import type {
    ResultFormData
} from "../types/result";

export const getAllResults = async () => {
    const response =
        await api.get("/results");

    return response.data;
};

export const getResultById = async (
    id: string
) => {
    const response =
        await api.get(`/results/${id}`);

    return response.data;
};

export const addResult = async (
    data: ResultFormData
) => {
    const response =
        await api.post("/results", data);

    return response.data;
};

export const updateResult = async (
    id: string,
    data: ResultFormData
) => {
    const response =
        await api.put(`/results/${id}`, data);

    return response.data;
};

export const deleteResult = async (
    id: string
) => {
    const response =
        await api.delete(`/results/${id}`);

    return response.data;
};