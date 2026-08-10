import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addCourse } from "../../services/courseService";
import type { CourseFormData } from "../../types/course";

function AddCourse() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState<CourseFormData>({
        course_name: "",
        course_code: "",
        duration_years: 1
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]:
                name === "duration_years"
                    ? Number(value)
                    : value
        }));

    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setLoading(true);

            await addCourse(formData);

            alert("Course added successfully!");

            navigate("/course-management");

        } catch (error) {

            console.error(
                "Failed to add course:",
                error
            );

            alert("Failed to add course");

        } finally {

            setLoading(false);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Add Course</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "500px",
                    marginTop: "25px"
                }}
            >

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        Course Name
                    </label>

                    <input
                        type="text"
                        name="course_name"
                        value={formData.course_name}
                        onChange={handleChange}
                        placeholder="Enter course name"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            border:
                                "1px solid #ccc",
                            borderRadius: "6px"
                        }}
                    />

                </div>

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        Course Code
                    </label>

                    <input
                        type="text"
                        name="course_code"
                        value={formData.course_code}
                        onChange={handleChange}
                        placeholder="Enter course code"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            border:
                                "1px solid #ccc",
                            borderRadius: "6px"
                        }}
                    />

                </div>

                <div style={{ marginBottom: "20px" }}>

                    <label>
                        Duration (Years)
                    </label>

                    <input
                        type="number"
                        name="duration_years"
                        value={formData.duration_years}
                        onChange={handleChange}
                        min={1}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px",
                            border:
                                "1px solid #ccc",
                            borderRadius: "6px"
                        }}
                    />

                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px"
                    }}
                >
                    {loading
                        ? "Saving..."
                        : "Save Course"}
                </button>

                <button
                    type="button"
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
                    Cancel
                </button>

            </form>

        </div>

    );
}

export default AddCourse;