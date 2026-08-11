import api from "../api/axios";
import type { TimetableFormData } from "../types/timetable";

// Get all timetable entries
export const getAllTimetables = async () => {
    const response = await api.get("/timetable");
    return response.data;
};


// Get one timetable entry
export const getTimetableById = async (id: string) => {
    const response = await api.get(`/timetable/${id}`);
    return response.data;
};


// Add timetable entry
export const addTimetable = async (
    data: TimetableFormData
) => {
    const response = await api.post(
        "/timetable",
        data
    );

    return response.data;
};


// Update timetable entry
export const updateTimetable = async (
    id: string,
    data: TimetableFormData
) => {
    const response = await api.put(
        `/timetable/${id}`,
        data
    );

    return response.data;
};


// Delete timetable entry
export const deleteTimetable = async (
    id: string
) => {
    const response = await api.delete(
        `/timetable/${id}`
    );

    return response.data;
};