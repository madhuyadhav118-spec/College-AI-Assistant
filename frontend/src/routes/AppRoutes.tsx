import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import StudentDashboard from "../pages/student/StudentDashboard";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";

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

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;