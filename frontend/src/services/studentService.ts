import api from "../api/axios";
import type { Student } from "../types/student";

type UpdateStudentData = {
    full_name: string;
    email: string;
    phone: string;
    roll_number: string;
    year: number;
    semester: number;
    status: string;
};

export const getAllStudents = async (): Promise<Student[]> => {

    const response = await api.get("/students");

    return response.data;

};

export const getStudentById = async (id: string) => {

    const response = await api.get(`/students/${id}`);

    return response.data;

};

export const updateStudent = async (
    id: string,
    data: UpdateStudentData
) => {
    const response = await api.put(`/students/${id}`, data);
    return response.data;
};

export const deleteStudent = async (id: string) => {
    const response = await api.delete(`/students/${id}`);
    return response.data;
};

type AddStudentData = {
    full_name: string;
    email: string;
    phone: string;
    roll_number: string;
    year: number;
    semester: number;
    department: string;
    status: string;
};

export const addStudent = async (data: AddStudentData) => {
    const response = await api.post("/students", data);
    return response.data;
};