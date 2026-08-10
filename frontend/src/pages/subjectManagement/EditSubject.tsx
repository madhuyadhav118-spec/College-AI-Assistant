import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getSubjectById,
    updateSubject
} from "../../services/subjectService";

import { getAllDepartments } from "../../services/departmentService";

import type { SubjectFormData } from "../../types/subject";

interface Department {
    department_id: number;
    department_name: string;
}

function EditSubject() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [departments, setDepartments] =
        useState<Department[]>([]);

    const [formData, setFormData] =
        useState<SubjectFormData>({
            subject_name: "",
            subject_code: "",
            department_id: 0,
            semester: 1,
            year: 1,
            credits: 1
        });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        const loadData = async () => {

            if (!id) {
                return;
            }

            try {

                const [subject, departmentData] =
                    await Promise.all([
                        getSubjectById(id),
                        getAllDepartments()
                    ]);

                setDepartments(departmentData);

                setFormData({
                    subject_name:
                        subject.subject_name ?? "",

                    subject_code:
                        subject.subject_code ?? "",

                    department_id:
                        subject.department_id ?? 0,

                    semester:
                        subject.semester ?? 1,

                    year:
                        subject.year ?? 1,

                    credits:
                        subject.credits ?? 1
                });

            } catch (error) {

                console.error(
                    "Failed to load subject:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadData();

    }, [id]);

    const handleChange = (
        e:
            React.ChangeEvent<
                HTMLInputElement |
                HTMLSelectElement
            >
    ) => {

        const { name, value } = e.target;

        setFormData((prev) => ({

            ...prev,

            [name]:
                name === "department_id" ||
                name === "semester" ||
                name === "year" ||
                name === "credits"
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

        if (formData.department_id === 0) {

            alert(
                "Please select a department"
            );

            return;

        }

        try {

            setSaving(true);

            await updateSubject(
                id,
                formData
            );

            alert(
                "Subject updated successfully!"
            );

            navigate(
                "/subject-management"
            );

        } catch (error) {

            console.error(
                "Failed to update subject:",
                error
            );

            alert(
                "Failed to update subject"
            );

        } finally {

            setSaving(false);

        }

    };

    if (loading) {

        return (
            <div style={{ padding: "30px" }}>
                <h2>
                    Loading subject...
                </h2>
            </div>
        );

    }

    return (

        <div style={{ padding: "30px" }}>

            <h1>Edit Subject</h1>

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
                        Subject Name
                    </label>

                    <input
                        type="text"
                        name="subject_name"
                        value={
                            formData.subject_name
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
                        Subject Code
                    </label>

                    <input
                        type="text"
                        name="subject_code"
                        value={
                            formData.subject_code
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
                        Department
                    </label>

                    <select
                        name="department_id"
                        value={
                            formData.department_id
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
                    >

                        <option value={0}>
                            Select Department
                        </option>

                        {departments.map(
                            (department) => (

                                <option
                                    key={
                                        department.department_id
                                    }
                                    value={
                                        department.department_id
                                    }
                                >
                                    {
                                        department.department_name
                                    }
                                </option>

                            )
                        )}

                    </select>

                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Semester
                    </label>

                    <input
                        type="number"
                        name="semester"
                        value={
                            formData.semester
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

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Year
                    </label>

                    <input
                        type="number"
                        name="year"
                        value={
                            formData.year
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

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label>
                        Credits
                    </label>

                    <input
                        type="number"
                        name="credits"
                        value={
                            formData.credits
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
                            "/subject-management"
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

export default EditSubject;