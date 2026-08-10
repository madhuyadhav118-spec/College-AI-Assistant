import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addSubject } from "../../services/subjectService";
import { getAllDepartments } from "../../services/departmentService";

import type { SubjectFormData } from "../../types/subject";

interface Department {
    department_id: number;
    department_name: string;
}

function AddSubject() {

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

    const [loading, setLoading] = useState(false);

    const [loadingDepartments, setLoadingDepartments] =
        useState(true);

    useEffect(() => {

        const loadDepartments = async () => {

            try {

                const data =
                    await getAllDepartments();

                console.log(
                    "Departments:",
                    data
                );

                setDepartments(data);

            } catch (error) {

                console.error(
                    "Failed to load departments:",
                    error
                );

            } finally {

                setLoadingDepartments(false);

            }

        };

        loadDepartments();

    }, []);

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

        if (formData.department_id === 0) {

            alert(
                "Please select a department"
            );

            return;

        }

        try {

            setLoading(true);

            await addSubject(formData);

            alert(
                "Subject added successfully!"
            );

            navigate(
                "/subject-management"
            );

        } catch (error) {

            console.error(
                "Failed to add subject:",
                error
            );

            alert(
                "Failed to add subject"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Add Subject</h1>

            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "500px",
                    marginTop: "25px"
                }}
            >

                {/* Subject Name */}

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
                        placeholder="Enter subject name"
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

                {/* Subject Code */}

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
                        placeholder="Enter subject code"
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

                {/* Department */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Department
                    </label>

                    {loadingDepartments ? (

                        <p>
                            Loading departments...
                        </p>

                    ) : (

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

                    )}

                </div>

                {/* Semester */}

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

                {/* Year */}

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

                {/* Credits */}

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

                {/* Buttons */}

                <button
                    type="submit"
                    disabled={
                        loading ||
                        loadingDepartments
                    }
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
                        : "Save Subject"}
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

export default AddSubject;