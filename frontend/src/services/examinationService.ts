import api from "../api/axios";
import type {
    ExaminationFormData,
    ExaminationRequestData
} from "../types/examination";
// Get all examinations
export const getAllExaminations = async () => {
    const response = await api.get("/examinations");

    return response.data;
};


// Get one examination
export const getExaminationById = async (id: string) => {
    const response = await api.get(
        `/examinations/${id}`
    );

    return response.data;
};


// Add examination
export const addExamination = async (
    data: ExaminationRequestData
) => {
    const response = await api.post(
        "/examinations",
        data
    );

    return response.data;
};


// Update examination
export const updateExamination = async (
    id: string,
    data: ExaminationFormData
) => {
    const response = await api.put(
        `/examinations/${id}`,
        data
    );

    return response.data;
};


// Delete examination
export const deleteExamination = async (
    id: string
) => {
    const response = await api.delete(
        `/examinations/${id}`
    );

    return response.data;
};