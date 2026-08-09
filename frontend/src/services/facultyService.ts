// import api from "../api/axios";
// import type { Faculty, FacultyFormData } from "../types/faculty";

// // Get all faculty
// export const getAllFaculty = async (): Promise<Faculty[]> => {
//     const response = await api.get("/faculty");
//     return response.data;
// };

// // Get faculty by ID
// export const getFacultyById = async (id: string): Promise<Faculty> => {
//     const response = await api.get(`/faculty/${id}`);
//     return response.data;
// };

// // Add new faculty
// export const addFaculty = async (data: FacultyFormData) => {
//     const response = await api.post("/faculty", data);
//     return response.data;
// };

// // Update faculty
// export const updateFaculty = async (
//     id: string,
//     data: FacultyFormData
// ) => {
//     const response = await api.put(`/faculty/${id}`, data);
//     return response.data;
// };

// // Delete faculty
// export const deleteFaculty = async (id: string) => {
//     const response = await api.delete(`/faculty/${id}`);
//     return response.data;
// };
import api from "../api/axios";
import type { FacultyFormData } from "../types/faculty";

// Get all faculty
export const getAllFaculty = async () => {
const response = await api.get("/faculty");
return response.data;
};

// Get one faculty
export const getFacultyById = async (id: string) => {
const response = await api.get(`/faculty/${id}`);
return response.data;
};

// Add faculty
export const addFaculty = async (data: FacultyFormData) => {
const response = await api.post("/faculty", data);
return response.data;
};

// Update faculty
export const updateFaculty = async (
id: string,
data: FacultyFormData
) => {
const response = await api.put(`/faculty/${id}`, data);
return response.data;
};

// Delete faculty
export const deleteFaculty = async (id: string) => {
const response = await api.delete(`/faculty/${id}`);
return response.data;
};
