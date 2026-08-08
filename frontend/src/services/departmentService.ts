import api from "../api/axios";
import type { DepartmentFormData } from "../types/department";

export const getAllDepartments = async () => {
    const response = await api.get("/departments");
    return response.data;
};

export const getDepartmentById = async (id: string) => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
};

export const addDepartment = async (data: DepartmentFormData) => {
    const response = await api.post("/departments", data);
    return response.data;
};

export const updateDepartment = async (
    id: string,
    data: DepartmentFormData
) => {
    const response = await api.put(`/departments/${id}`, data);
    return response.data;
};

export const deleteDepartment = async (id: string) => {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
};