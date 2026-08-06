import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import Students from "../pages/studentManagement/Students";
import StudentDetails from "../pages/admin/StudentDetails";
import EditStudent from "../pages/student/EditStudent";

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
            path="/admin/students/:id"
            element={<StudentDetails />}
        />

        <Route
            path="/students/edit/:id"
            element={<EditStudent />}
        />


        <Route
          path="/faculty"
          element={<FacultyDashboard />}
        />

        <Route
            path="/students"
            element={<Students />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;