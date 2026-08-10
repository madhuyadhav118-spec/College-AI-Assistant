import api from "../api/axios";
import type { SubjectFormData } from "../types/subject";

// Get all subjects
export const getAllSubjects = async () => {
    const response = await api.get("/subjects");
    return response.data;
};

// Get one subject
export const getSubjectById = async (id: string) => {
    const response = await api.get(`/subjects/${id}`);
    return response.data;
};

// Add subject
export const addSubject = async (data: SubjectFormData) => {
    const response = await api.post("/subjects", data);
    return response.data;
};

// Update subject
export const updateSubject = async (
    id: string,
    data: SubjectFormData
) => {
    const response = await api.put(`/subjects/${id}`, data);
    return response.data;
};

// Delete subject
export const deleteSubject = async (id: string) => {
    const response = await api.delete(`/subjects/${id}`);
    return response.data;
};