import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import Students from "../pages/studentManagement/Students";
import StudentDetails from "../pages/admin/StudentDetails";
import EditStudent from "../pages/student/EditStudent";
import AddStudent from "../pages/student/AddStudent";
import Departments from "../pages/departmentManagement/Departments";
import DepartmentDetails from "../pages/departmentManagement/DepartmentDetails";
import EditDepartment from "../pages/departmentManagement/EditDepartment";
import AddDepartment from "../pages/departmentManagement/AddDepartment";

function AppRoutes() {
    return (
        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route
                    path="/admin"
                    element={<AdminDashboard />}
                />

                <Route
                    path="/student"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/faculty"
                    element={<FacultyDashboard />}
                />

                <Route
                    path="/students"
                    element={<Students />}
                />

                <Route
                    path="/admin/students/:id"
                    element={<StudentDetails />}
                />

                <Route
                    path="/admin/students/edit/:id"
                    element={<EditStudent />}
                />

                <Route
                    path="/admin/students/add"
                    element={<AddStudent />}
                />

                {/* Department Route */}
                <Route
                    path="/departments"
                    element={<Departments />}
                />

                <Route
                    path="/departments/:id"
                    element={<DepartmentDetails />}
                />

                <Route
                    path="/departments/edit/:id"
                    element={<EditDepartment />}
                />

                <Route
                    path="/departments/add"
                    element={<AddDepartment />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;