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
import Faculty from "../pages/facultyManagement/Faculty";
import FacultyDetails from "../pages/facultyManagement/FacultyDetails";
import AddFaculty from "../pages/facultyManagement/AddFaculty";
import EditFaculty from "../pages/facultyManagement/EditFaculty";
import Courses from "../pages/courseManagement/Courses";
import AddCourse from "../pages/courseManagement/AddCourse";
import CourseDetails from "../pages/courseManagement/CourseDetails";
import EditCourse from "../pages/courseManagement/EditCourse";
import Subjects from "../pages/subjectManagement/Subjects";
import AddSubject from "../pages/subjectManagement/AddSubject";
import SubjectDetails from "../pages/subjectManagement/SubjectDetails";
import EditSubject from "../pages/subjectManagement/EditSubject";
import Timetables from "../pages/timetableManagement/Timetables";
import AddTimetable from "../pages/timetableManagement/AddTimetable";
import TimetableDetails from "../pages/timetableManagement/TimetableDetails";
import EditTimetable from "../pages/timetableManagement/EditTimetable";
import Attendances from "../pages/attendanceManagement/Attendances";
import AddAttendance from "../pages/attendanceManagement/AddAttendance";
import AttendanceDetails from "../pages/attendanceManagement/AttendanceDetails";
import EditAttendance from "../pages/attendanceManagement/EditAttendance";

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
                    path="/faculty-management"
                    element={<Faculty />}
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

                <Route
                    path="/faculty-management/:id"
                    element={<FacultyDetails />}
                />

                <Route
                    path="/faculty-management/add"
                    element={<AddFaculty />}
                />

                <Route
                    path="/faculty-management/edit/:id"
                    element={<EditFaculty />}
                />

                <Route
                    path="/course-management"
                    element={<Courses />}
                />

                <Route
                    path="/course-management/add"
                    element={<AddCourse />}
                />

                <Route
                    path="/course-management/:id"
                    element={<CourseDetails />}
                />

                <Route
                    path="/course-management/edit/:id"
                    element={<EditCourse />}
                />

                <Route
                    path="/subject-management"
                    element={<Subjects />}
                />

                <Route
                    path="/subject-management/add"
                    element={<AddSubject />}
                />

                <Route
                    path="/subject-management/:id"
                    element={<SubjectDetails />}
                />

                <Route
                    path="/subject-management/edit/:id"
                    element={<EditSubject />}
                />

                <Route
                    path="/timetable-management"
                    element={<Timetables />}
                />

                <Route
                    path="/timetable-management/add"
                    element={<AddTimetable />}
                />

                <Route
                    path="/timetable-management/view/:id"
                    element={<TimetableDetails />}
                />

                <Route
                    path="/timetable-management/edit/:id"
                    element={<EditTimetable />}
                />

                <Route
                    path="/attendance-management"
                    element={<Attendances />}
                />

                <Route
                    path="/attendance-management/add"
                    element={<AddAttendance />}
                />

                <Route
                    path="/attendance-management/view/:id"
                    element={<AttendanceDetails />}
                />

                <Route
                    path="/attendance-management/edit/:id"
                    element={<EditAttendance />}
                />
            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;