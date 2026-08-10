import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getSubjectById } from "../../services/subjectService";

import type { Subject } from "../../types/subject";

interface Department {
    department_id: number;
    department_name: string;
}

interface SubjectWithDepartment extends Subject {
    departments?: Department;
}

function SubjectDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [subject, setSubject] =
        useState<SubjectWithDepartment | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadSubject = async () => {

            if (!id) {
                return;
            }

            try {

                const data =
                    await getSubjectById(id);

                console.log(
                    "Subject details:",
                    data
                );

                setSubject(data);

            } catch (error) {

                console.error(
                    "Failed to load subject:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadSubject();

    }, [id]);

    if (loading) {

        return (
            <div style={{ padding: "30px" }}>
                <h2>
                    Loading subject...
                </h2>
            </div>
        );

    }

    if (!subject) {

        return (
            <div style={{ padding: "30px" }}>

                <h2>
                    Subject not found
                </h2>

                <button
                    onClick={() =>
                        navigate(
                            "/subject-management"
                        )
                    }
                >
                    Back to Subjects
                </button>

            </div>
        );

    }

    return (

        <div style={{ padding: "30px" }}>

            <h1>
                Subject Details
            </h1>

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

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    <strong>
                        Subject ID:
                    </strong>

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.subject_id}
                    </span>
                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    <strong>
                        Subject Name:
                    </strong>

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.subject_name}
                    </span>
                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    <strong>
                        Subject Code:
                    </strong>

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.subject_code}
                    </span>
                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    <strong>
                        Department:
                    </strong>

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.departments
                            ?.department_name ??
                            `Department ID: ${subject.department_id}`}
                    </span>
                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    <strong>
                        Semester:
                    </strong>

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.semester}
                    </span>
                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    <strong>
                        Year:
                    </strong>

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.year}
                    </span>
                </div>

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >
                    <strong>
                        Credits:
                    </strong>

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.credits}
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

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.created_at
                            ? new Date(
                                  subject.created_at
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

                    <span
                        style={{
                            marginLeft: "10px"
                        }}
                    >
                        {subject.updated_at
                            ? new Date(
                                  subject.updated_at
                              ).toLocaleDateString()
                            : "-"}
                    </span>
                </div>

                <button
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
                    Back to Subjects
                </button>

            </div>

        </div>

    );

}

export default SubjectDetails;