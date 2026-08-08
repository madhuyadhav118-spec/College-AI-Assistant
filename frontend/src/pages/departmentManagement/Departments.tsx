import { useEffect, useState } from "react";
import {
    getAllDepartments,
    deleteDepartment
} from "../../services/departmentService";
import type { Department } from "../../types/department";
import { Link, useNavigate } from "react-router-dom";

function Departments() {

    const [departments, setDepartments] = useState<Department[]>([]);
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    useEffect(() => {

        const loadDepartments = async () => {

            try {

                const data = await getAllDepartments();

                console.log(data);

                setDepartments(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadDepartments();

    }, []);

    const handleDelete = async (id: number) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this department?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteDepartment(String(id));

            alert("Department deleted successfully!");

            setDepartments((prevDepartments) =>
                prevDepartments.filter(
                    (department) => department.department_id !== id
                )
            );

        } catch (error) {

            console.error(error);

            alert("Failed to delete department.");

        }
    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>Departments</h1>

            <p>Total Departments: {departments.length}</p>
            <input
                type="text"
                placeholder="Search Department..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <button
                onClick={() => navigate("/departments/add")}
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
                + Add Department
            </button>
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    marginTop: "20px",
                    background: "#fff",
                    boxShadow: "0 4px 10px rgba(0,0,0,.1)"
                }}
            >

                <thead>

                    <tr
                        style={{
                            background: "#2563eb",
                            color: "white"
                        }}
                    >

                        <th style={{ padding: "15px" }}>ID</th>

                        <th style={{ padding: "15px" }}>Department</th>

                        <th style={{ padding: "15px" }}>Code</th>

                        <th style={{ padding: "15px" }}>HOD</th>

                        <th style={{ padding: "15px" }}>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    

                    {departments
                    .filter((department) => {
                        return (
                            department.department_name
                                .toLowerCase()
                                .includes(search.toLowerCase()) ||

                            department.department_code
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        );
                    })
                    .map((department) => (

                        <tr key={department.department_id}>

                            <td
                                style={{
                                    padding: "12px",
                                    borderBottom: "1px solid #ddd"
                                }}
                            >
                                {department.department_id}
                            </td>

                            <td
                                style={{
                                    padding: "12px",
                                    borderBottom: "1px solid #ddd"
                                }}
                            >
                                {department.department_name}
                            </td>

                            <td
                                style={{
                                    padding: "12px",
                                    borderBottom: "1px solid #ddd"
                                }}
                            >
                                {department.department_code}
                            </td>

                            <td
                                style={{
                                    padding: "12px",
                                    borderBottom: "1px solid #ddd"
                                }}
                            >
                                {department.hod_name}
                            </td>

                            <td
                                style={{
                                    padding: "12px",
                                    borderBottom: "1px solid #ddd",
                                    display: "flex",
                                    gap: "8px",
                                    justifyContent: "center"
                                }}
                            >
                                <button
                                    onClick={() => navigate(`/departments/${department.department_id}`)}
                                    style={{
                                        background: "#3b82f6",
                                        color: "white",
                                        border: "none",
                                        padding: "6px 12px",
                                        borderRadius: "6px",
                                        cursor: "pointer"
                                    }}
                                >
                                    View
                                </button>

                                <Link to={`/departments/edit/${department.department_id}`}>
                                    <button
                                        style={{
                                            background: "#f59e0b",
                                            color: "white",
                                            border: "none",
                                            padding: "6px 12px",
                                            borderRadius: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Edit
                                    </button>
                                </Link>

                                <button
                                    onClick={() => handleDelete(department.department_id)}
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

export default Departments;