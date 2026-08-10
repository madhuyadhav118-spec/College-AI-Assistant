import api from "../api/axios";
import type { CourseFormData } from "../types/course";

// Get all courses
export const getAllCourses = async () => {
    const response = await api.get("/courses");
    return response.data;
};

// Get one course
export const getCourseById = async (id: string) => {
    const response = await api.get(`/courses/${id}`);
    return response.data;
};

// Add course
export const addCourse = async (data: CourseFormData) => {
    const response = await api.post("/courses", data);
    return response.data;
};

// Update course
export const updateCourse = async (
    id: string,
    data: CourseFormData
) => {
    const response = await api.put(`/courses/${id}`, data);
    return response.data;
};

// Delete course
export const deleteCourse = async (id: string) => {
    const response = await api.delete(`/courses/${id}`);
    return response.data;
};