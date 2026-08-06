import api from "../api/axios";
import type { Student } from "../types/student";

export const getAllStudents = async (): Promise<Student[]> => {

    const response = await api.get("/students");

    return response.data;

};

export const getStudentById = async (id: string) => {

    const response = await api.get(`/students/${id}`);

    return response.data;

};