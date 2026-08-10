import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getAllCourses,
    deleteCourse
} from "../../services/courseService";

import type { Course } from "../../types/course";

function Courses() {

    const [courses, setCourses] = useState<Course[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const loadCourses = async () => {

            try {

                const data = await getAllCourses();

                console.log(data);

                setCourses(data);

            } catch (error) {

                console.error(
                    "Failed to load courses:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadCourses();

    }, []);

    const filteredCourses = courses.filter((course) => {

        const searchText = search.toLowerCase();

        return (
            course.course_name
                .toLowerCase()
                .includes(searchText) ||

            course.course_code
                .toLowerCase()
                .includes(searchText)
        );

    });

    return (

        <div style={{ padding: "30px" }}>

            <h1>Course Management</h1>

            <p>
                Total Courses: {courses.length}
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "20px",
                    alignItems: "center"
                }}
            >

                <input
                    type="text"
                    placeholder="Search Course..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    style={{
                        padding: "10px",
                        width: "300px",
                        border: "1px solid #ccc",
                        borderRadius: "6px"
                    }}
                />

                <button
                    onClick={() =>
                        navigate("/course-management/add")
                    }
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    + Add Course
                </button>

            </div>

            {loading ? (

                <p style={{ marginTop: "30px" }}>
                    Loading courses...
                </p>

            ) : (

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                        background: "#fff",
                        boxShadow:
                            "0 4px 10px rgba(0,0,0,.1)"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#2563eb",
                                color: "white"
                            }}
                        >

                            <th style={{ padding: "15px" }}>
                                ID
                            </th>

                            <th style={{ padding: "15px" }}>
                                Course Name
                            </th>

                            <th style={{ padding: "15px" }}>
                                Course Code
                            </th>

                            <th style={{ padding: "15px" }}>
                                Duration
                            </th>

                            <th style={{ padding: "15px" }}>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredCourses.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >
                                    No courses found.
                                </td>

                            </tr>

                        ) : (

                            filteredCourses.map((course) => (

                                <tr
                                    key={course.course_id}
                                >

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {course.course_id}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {course.course_name}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {course.course_code}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {course.duration_years} Years
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/course-management/${course.course_id}`
                                                )
                                            }
                                            style={{
                                                background:
                                                    "#3b82f6",
                                                color: "white",
                                                border: "none",
                                                padding:
                                                    "6px 12px",
                                                borderRadius:
                                                    "6px",
                                                cursor: "pointer",
                                                marginRight:
                                                    "6px"
                                            }}
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(
                                                    `/course-management/edit/${course.course_id}`
                                                )
                                            }
                                            style={{
                                                background:
                                                    "#f59e0b",
                                                color: "white",
                                                border: "none",
                                                padding:
                                                    "6px 12px",
                                                borderRadius:
                                                    "6px",
                                                cursor: "pointer",
                                                marginRight:
                                                    "6px"
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                        onClick={async () => {

                                            const confirmDelete = window.confirm(
                                                "Are you sure you want to delete this course?"
                                            );

                                            if (!confirmDelete) {
                                                return;
                                            }

                                            try {

                                                await deleteCourse(
                                                    String(course.course_id)
                                                );

                                                alert(
                                                    "Course deleted successfully!"
                                                );

                                                const data =
                                                    await getAllCourses();

                                                setCourses(data);

                                            } catch (error) {

                                                console.error(
                                                    "Failed to delete course:",
                                                    error
                                                );

                                                alert(
                                                    "Failed to delete course"
                                                );

                                            }

                                        }}
                                        style={{
                                            background: "#ef4444",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Delete
                                    </button>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            )}

        </div>

    );
}

export default Courses;