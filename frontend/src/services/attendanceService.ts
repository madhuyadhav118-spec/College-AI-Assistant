import api from "../api/axios";
import type { AttendanceFormData } from "../types/attendance";

// Get all attendance records
export const getAllAttendance = async () => {
    const response = await api.get("/attendance");
    return response.data;
};


// Get one attendance record
export const getAttendanceById = async (id: string) => {
    const response = await api.get(`/attendance/${id}`);
    return response.data;
};


// Create attendance record
export const addAttendance = async (
    data: AttendanceFormData
) => {
    const response = await api.post(
        "/attendance",
        data
    );

    return response.data;
};


// Update attendance record
export const updateAttendance = async (
    id: string,
    data: AttendanceFormData
) => {
    const response = await api.put(
        `/attendance/${id}`,
        data
    );

    return response.data;
};


// Delete attendance record
export const deleteAttendance = async (
    id: string
) => {
    const response = await api.delete(
        `/attendance/${id}`
    );

    return response.data;
};