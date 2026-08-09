import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
getAllFaculty,
deleteFaculty
} from "../../services/facultyService";

import type { Faculty } from "../../types/faculty";

function FacultyPage() {


const [faculty, setFaculty] = useState<Faculty[]>([]);
const [search, setSearch] = useState("");
const [loading, setLoading] = useState(true);

const navigate = useNavigate();

useEffect(() => {

    const loadFaculty = async () => {

        try {

            const data = await getAllFaculty();

            console.log(data);

            setFaculty(data);

        } catch (error) {

            console.error("Failed to load faculty:", error);

        } finally {

            setLoading(false);

        }

    };

    loadFaculty();

}, []);

const filteredFaculty = faculty.filter((member) => {

    const searchText = search.toLowerCase();

    return (
        member.users?.full_name
            ?.toLowerCase()
            .includes(searchText) ||

        member.employee_id
            .toLowerCase()
            .includes(searchText) ||

        member.department
            .toLowerCase()
            .includes(searchText) ||

        member.designation
            ?.toLowerCase()
            .includes(searchText)
    );

});

return (

    <div
        style={{
            padding: "30px"
        }}
    >

        <h1>Faculty Management</h1>

        <p>
            Total Faculty: {faculty.length}
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
                placeholder="Search Faculty..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    padding: "10px",
                    width: "300px",
                    border: "1px solid #ccc",
                    borderRadius: "6px"
                }}
            />

            <button
                onClick={() => navigate("/faculty-management/add")}
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
                + Add Faculty
            </button>

        </div>

        {loading ? (

            <p style={{ marginTop: "30px" }}>
                Loading faculty...
            </p>

        ) : (

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

                        <th style={{ padding: "15px" }}>
                            ID
                        </th>

                        <th style={{ padding: "15px" }}>
                            Name
                        </th>

                        <th style={{ padding: "15px" }}>
                            Employee ID
                        </th>

                        <th style={{ padding: "15px" }}>
                            Department
                        </th>

                        <th style={{ padding: "15px" }}>
                            Designation
                        </th>

                        <th style={{ padding: "15px" }}>
                            Status
                        </th>

                        <th style={{ padding: "15px" }}>
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredFaculty.length === 0 ? (

                        <tr>

                            <td
                                colSpan={7}
                                style={{
                                    textAlign: "center",
                                    padding: "20px"
                                }}
                            >
                                No faculty found.
                            </td>

                        </tr>

                    ) : (

                        filteredFaculty.map((member) => (

                            <tr key={member.faculty_id}>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {member.faculty_id}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {member.users?.full_name || "-"}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {member.employee_id}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {member.departments?.department_name ||
                                        member.department ||
                                        "-"}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {member.designation || "-"}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    {member.status || "ACTIVE"}
                                </td>

                                <td
                                    style={{
                                        padding: "12px",
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >

                                    {/* View */}
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/faculty-management/${member.faculty_id}`
                                            )
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

                                    {/* Edit */}
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/faculty-management/edit/${member.faculty_id}`
                                            )
                                        }
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

                                    {/* Delete */}
                                    <button
                                        onClick={async () => {

                                            const confirmDelete =
                                                window.confirm(
                                                    "Are you sure you want to delete this faculty?"
                                                );

                                            if (!confirmDelete) {
                                                return;
                                            }

                                            try {

                                                await deleteFaculty(
                                                    String(member.faculty_id)
                                                );

                                                alert(
                                                    "Faculty deleted successfully!"
                                                );

                                                const data =
                                                    await getAllFaculty();

                                                setFaculty(data);

                                            } catch (error) {

                                                console.error(
                                                    "Failed to delete faculty:",
                                                    error
                                                );

                                                alert(
                                                    "Failed to delete faculty"
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

export default FacultyPage;
