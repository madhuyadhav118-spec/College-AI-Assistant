import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getCourseById,
    updateCourse
} from "../../services/courseService";

import type {
    CourseFormData
} from "../../types/course";

function EditCourse() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState<CourseFormData>({
            course_name: "",
            course_code: "",
            duration_years: 1
        });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        const loadCourse = async () => {

            if (!id) {
                return;
            }

            try {

                const data =
                    await getCourseById(id);

                setFormData({
                    course_name:
                        data.course_name ?? "",

                    course_code:
                        data.course_code ?? "",

                    duration_years:
                        data.duration_years ?? 1
                });

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

        if (!id) {
            return;
        }

        try {

            setSaving(true);

            await updateCourse(
                id,
                formData
            );

            alert(
                "Course updated successfully!"
            );

            navigate(
                "/course-management"
            );

        } catch (error) {

            console.error(
                "Failed to update course:",
                error
            );

            alert(
                "Failed to update course"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <div style={{ padding: "30px" }}>
                <h2>
                    Loading course...
                </h2>
            </div>
        );

    }

    return (

        <div style={{ padding: "30px" }}>

            <h1>Edit Course</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "500px",
                    marginTop: "25px"
                }}
            >

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Course Name
                    </label>

                    <input
                        type="text"
                        name="course_name"
                        value={
                            formData.course_name
                        }
                        onChange={
                            handleChange
                        }
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

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Course Code
                    </label>

                    <input
                        type="text"
                        name="course_code"
                        value={
                            formData.course_code
                        }
                        onChange={
                            handleChange
                        }
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

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label>
                        Duration (Years)
                    </label>

                    <input
                        type="number"
                        name="duration_years"
                        value={
                            formData.duration_years
                        }
                        onChange={
                            handleChange
                        }
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
                    disabled={saving}
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
                    {saving
                        ? "Saving..."
                        : "Save Changes"}
                </button>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/course-management"
                        )
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

export default EditCourse;