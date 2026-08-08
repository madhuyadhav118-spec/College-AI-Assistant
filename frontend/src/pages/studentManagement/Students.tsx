import { useEffect, useState } from "react";
import {
    getAllStudents,
    deleteStudent
} from "../../services/studentService";
import type { Student } from "../../types/student";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Students() {

    const [students, setStudents] = useState<Student[]>([]);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        const loadStudents = async () => {

            try {

                const data = await getAllStudents();

                console.log("Students API Response:", JSON.stringify(data, null, 2));

                setStudents(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadStudents();

    }, []);
            const handleDelete = async (id: number) => {

            const confirmDelete = window.confirm(
                "Are you sure you want to delete this student?"
            );

            if (!confirmDelete) return;

            try {

                await deleteStudent(id.toString());

                alert("Student deleted successfully!");

                setStudents((prev) =>
                    prev.filter((student) => student.student_id !== id)
                );

            } catch (error) {

                console.error(error);

                alert("Failed to delete student.");

            }

        };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Students</h1>

            <p>Total Students: {students.length}</p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >

                <input
                    type="text"
                    placeholder="Search by Name or Roll Number..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "320px",
                        padding: "10px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        fontSize: "15px"
                    }}
                />

                <button
                    onClick={() => navigate("/admin/students/add")}
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
                    + Add Student
                </button>

            </div>

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    background: "#fff",
                    boxShadow: "0 4px 12px rgba(0,0,0,.08)"
                }}
            >

                <thead>

                    <tr
                        style={{
                            background: "#2563eb",
                            color: "white"
                        }}
                    >

                        <th style={{ padding: "15px" }}>Student ID</th>

                        <th style={{ padding: "15px" }}>Roll Number</th>

                        <th
                            style={{
                                padding: "15px",
                                minWidth: "220px"
                            }}
                        >
                            Full Name
                        </th>

                        <th style={{ padding: "15px" }}>Email</th>

                        <th style={{ padding: "15px" }}>Phone</th>

                        <th style={{ padding: "15px" }}>Department</th>

                        <th
                            style={{
                                padding: "15px",
                                width: "240px"
                            }}
                        >
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {students
                        .filter((student) => {

                            const name = student.users?.full_name?.toLowerCase() || "";
                            const roll = student.roll_number?.toLowerCase() || "";

                            return (
                                name.includes(search.toLowerCase()) ||
                                roll.includes(search.toLowerCase())
                            );

                        })
                        .map((student) => (

                            <tr key={student.student_id}>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {student.student_id}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {student.roll_number}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd",
                                        minWidth: "220px"
                                    }}
                                >
                                    {student.users?.full_name}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {student.users?.email}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {student.users?.phone || "-"}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {student.departments?.department_name || "Not Assigned"}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd",
                                        width: "240px",
                                        textAlign: "center"
                                    }}
                                >

                                    <button
                                        onClick={() =>
                                            navigate(`/admin/students/${student.student_id}`)
                                        }
                                        style={{
                                            background: "#3b82f6",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            marginRight: "6px"
                                        }}
                                    >
                                        View
                                    </button>
                                    <Link to={`/students/edit/${student.student_id}`}>
                                    <button
                                        style={{
                                            background: "#f59e0b",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer",
                                            marginRight: "6px"
                                        }}
                                    >
                                    

                                        Edit
                                    </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(student.student_id)}
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

                        ))}

                </tbody>

            </table>

        </div>

    );

}

export default Students;