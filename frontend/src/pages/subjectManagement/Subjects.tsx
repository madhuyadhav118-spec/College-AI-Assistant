import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllSubjects,
    deleteSubject
} from "../../services/subjectService";

import type { Subject } from "../../types/subject";

function Subjects() {

    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const loadSubjects = async () => {

            try {

                const data = await getAllSubjects();

                console.log(data);

                setSubjects(data);

            } catch (error) {

                console.error(
                    "Failed to load subjects:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadSubjects();

    }, []);

    const filteredSubjects = subjects.filter((subject) => {

        const searchText = search.toLowerCase();

        return (
            subject.subject_name
                .toLowerCase()
                .includes(searchText) ||

            subject.subject_code
                .toLowerCase()
                .includes(searchText)
        );

    });

    return (

        <div style={{ padding: "30px" }}>

            <h1>Subject Management</h1>

            <p>
                Total Subjects: {subjects.length}
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
                    placeholder="Search Subject..."
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
                        navigate("/subject-management/add")
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
                    + Add Subject
                </button>

            </div>

            {loading ? (

                <p style={{ marginTop: "30px" }}>
                    Loading subjects...
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
                                Subject Name
                            </th>

                            <th style={{ padding: "15px" }}>
                                Subject Code
                            </th>

                            <th style={{ padding: "15px" }}>
                                Department ID
                            </th>

                            <th style={{ padding: "15px" }}>
                                Semester
                            </th>

                            <th style={{ padding: "15px" }}>
                                Year
                            </th>

                            <th style={{ padding: "15px" }}>
                                Credits
                            </th>

                            <th style={{ padding: "15px" }}>
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredSubjects.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={8}
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >
                                    No subjects found.
                                </td>

                            </tr>

                        ) : (

                            filteredSubjects.map((subject) => (

                                <tr
                                    key={subject.subject_id}
                                >

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {subject.subject_id}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {subject.subject_name}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {subject.subject_code}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {subject.department_id}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {subject.semester}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {subject.year}
                                    </td>

                                    <td
                                        style={{
                                            padding: "12px",
                                            borderBottom:
                                                "1px solid #ddd"
                                        }}
                                    >
                                        {subject.credits}
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
                                                    `/subject-management/${subject.subject_id}`
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
                                                    `/subject-management/edit/${subject.subject_id}`
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
                                                    "Are you sure you want to delete this subject?"
                                                );

                                                if (!confirmDelete) {
                                                    return;
                                                }

                                                try {

                                                    await deleteSubject(
                                                        String(subject.subject_id)
                                                    );

                                                    alert(
                                                        "Subject deleted successfully!"
                                                    );

                                                    const data =
                                                        await getAllSubjects();

                                                    setSubjects(data);

                                                } catch (error) {

                                                    console.error(
                                                        "Failed to delete subject:",
                                                        error
                                                    );

                                                    alert(
                                                        "Failed to delete subject"
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

export default Subjects;