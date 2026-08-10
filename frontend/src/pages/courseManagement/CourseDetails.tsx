import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getCourseById } from "../../services/courseService";
import type { Course } from "../../types/course";

function CourseDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadCourse = async () => {

            if (!id) {
                return;
            }

            try {

                const data = await getCourseById(id);

                console.log(data);

                setCourse(data);

            } catch (error) {

                console.error(
                    "Failed to load course:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadCourse();

    }, [id]);

    if (loading) {

        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading course...</h2>
            </div>
        );

    }

    if (!course) {

        return (
            <div style={{ padding: "30px" }}>

                <h2>Course not found</h2>

                <button
                    onClick={() =>
                        navigate("/course-management")
                    }
                >
                    Back to Courses
                </button>

            </div>
        );

    }

    return (

        <div style={{ padding: "30px" }}>

            <h1>Course Details</h1>

            <div
                style={{
                    marginTop: "25px",
                    maxWidth: "600px",
                    background: "white",
                    padding: "25px",
                    borderRadius: "10px",
                    boxShadow:
                        "0 4px 10px rgba(0,0,0,0.1)"
                }}
            >

                <div style={{ marginBottom: "15px" }}>

                    <strong>
                        Course ID:
                    </strong>

                    <span style={{ marginLeft: "10px" }}>
                        {course.course_id}
                    </span>

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <strong>
                        Course Name:
                    </strong>

                    <span style={{ marginLeft: "10px" }}>
                        {course.course_name}
                    </span>

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <strong>
                        Course Code:
                    </strong>

                    <span style={{ marginLeft: "10px" }}>
                        {course.course_code}
                    </span>

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <strong>
                        Duration:
                    </strong>

                    <span style={{ marginLeft: "10px" }}>
                        {course.duration_years} Years
                    </span>

                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <strong>
                        Created At:
                    </strong>

                    <span style={{ marginLeft: "10px" }}>
                        {course.created_at
                            ? new Date(
                                  course.created_at
                              ).toLocaleDateString()
                            : "-"}
                    </span>

                </div>

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <strong>
                        Updated At:
                    </strong>

                    <span style={{ marginLeft: "10px" }}>
                        {course.updated_at
                            ? new Date(
                                  course.updated_at
                              ).toLocaleDateString()
                            : "-"}
                    </span>

                </div>

                <button
                    onClick={() =>
                        navigate("/course-management")
                    }
                    style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Back to Courses
                </button>

            </div>

        </div>

    );

}

export default CourseDetails;