import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllAttendance,
    deleteAttendance
} from "../../services/attendanceService";

import type { Attendance } from "../../types/attendance";


const Attendances = () => {

    const navigate = useNavigate();

    const [attendance, setAttendance] =
        useState<Attendance[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");


    // Load attendance records
    const loadAttendance = async () => {

        try {

            setLoading(true);

            const data = await getAllAttendance();

            setAttendance(data);

        } catch (error) {

            console.error(
                "Failed to load attendance:",
                error
            );

        } finally {

            setLoading(false);

        }
    };


    // Load data when page opens
    useEffect(() => {

        getAllAttendance()
            .then((data) => {
                setAttendance(data);
            })
            .catch((error) => {
                console.error(
                    "Failed to load attendance:",
                    error
                );
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);


    // Delete attendance
    const handleDelete = async (
        id: number
    ) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this attendance record?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await deleteAttendance(
                String(id)
            );

            alert(
                "Attendance deleted successfully!"
            );

            await loadAttendance();

        } catch (error) {

            console.error(
                "Failed to delete attendance:",
                error
            );

            alert(
                "Failed to delete attendance."
            );
        }
    };


    // Search
    const filteredAttendance =
        attendance.filter((record) => {

            const searchText =
                search.toLowerCase();

            return (

                record.attendance_id
                    .toString()
                    .includes(searchText)

                ||

                record.student_id
                    .toString()
                    .includes(searchText)

                ||

                record.faculty_id
                    .toString()
                    .includes(searchText)

                ||

                (
                    record.status ?? ""
                )
                    .toLowerCase()
                    .includes(searchText)

                ||

                (
                    record.remarks ?? ""
                )
                    .toLowerCase()
                    .includes(searchText)
            );
        });


    if (loading) {

        return (
            <div
                style={{
                    padding: "40px",
                    textAlign: "center"
                }}
            >
                <h2>
                    Loading attendance...
                </h2>
            </div>
        );

    }


    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#e0f2fe",
                padding: "30px"
            }}
        >

            {/* Heading */}

            <div
                style={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >

                <h1
                    style={{
                        fontSize: "32px",
                        margin: "0 0 8px 0"
                    }}
                >
                    Attendance Management
                </h1>


                <p
                    style={{
                        color: "#64748b",
                        fontSize: "16px",
                        margin: 0
                    }}
                >
                    Total Records:{" "}
                    {attendance.length}
                </p>

            </div>


            {/* Search + Add */}

            <div
                style={{
                    display: "flex",
                    gap: "14px",
                    marginBottom: "18px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search attendance..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    style={{
                        width: "220px",
                        padding: "10px",
                        border:
                            "1px solid #cbd5e1",
                        borderRadius: "6px",
                        fontSize: "14px",
                        outline: "none"
                    }}
                />


                <button
                    onClick={() =>
                        navigate(
                            "/attendance-management/add"
                        )
                    }
                    style={{
                        flex: 1,
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "bold",
                        cursor: "pointer"
                    }}
                >
                    + Add Attendance
                </button>

            </div>


            {/* Table */}

            <div
                style={{
                    background: "white",
                    borderRadius: "8px",
                    overflow: "hidden",
                    boxShadow:
                        "0 2px 8px rgba(0,0,0,0.12)"
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse:
                            "collapse"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background:
                                    "#2563eb",
                                color: "white"
                            }}
                        >

                            <th style={headerStyle}>
                                ID
                            </th>

                            <th style={headerStyle}>
                                Student ID
                            </th>

                            <th style={headerStyle}>
                                Faculty ID
                            </th>

                            <th style={headerStyle}>
                                Attendance Date
                            </th>

                            <th style={headerStyle}>
                                Status
                            </th>

                            <th style={headerStyle}>
                                Remarks
                            </th>

                            <th style={headerStyle}>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredAttendance.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={7}
                                    style={{
                                        padding: "30px",
                                        textAlign:
                                            "center",
                                        color:
                                            "#64748b"
                                    }}
                                >
                                    No attendance
                                    records found.
                                </td>

                            </tr>

                        ) : (

                            filteredAttendance.map(
                                (record) => (

                                    <tr
                                        key={
                                            record.attendance_id
                                        }
                                        style={{
                                            borderBottom:
                                                "1px solid #e2e8f0"
                                        }}
                                    >

                                        <td style={cellStyle}>
                                            {
                                                record.attendance_id
                                            }
                                        </td>


                                        <td style={cellStyle}>
                                            {
                                                record.student_id
                                            }
                                        </td>


                                        <td style={cellStyle}>
                                            {
                                                record.faculty_id
                                            }
                                        </td>


                                        <td style={cellStyle}>

                                            {new Date(
                                                record.attendance_date
                                            ).toLocaleDateString()}

                                        </td>


                                        <td style={cellStyle}>

                                            <span
                                                style={{
                                                    display:
                                                        "inline-block",
                                                    padding:
                                                        "5px 10px",
                                                    borderRadius:
                                                        "15px",
                                                    fontWeight:
                                                        "bold",
                                                    fontSize:
                                                        "13px",
                                                    background:
                                                        record.status ===
                                                        "PRESENT"
                                                            ? "#dcfce7"
                                                            : record.status ===
                                                              "ABSENT"
                                                            ? "#fee2e2"
                                                            : "#fef3c7",
                                                    color:
                                                        record.status ===
                                                        "PRESENT"
                                                            ? "#166534"
                                                            : record.status ===
                                                              "ABSENT"
                                                            ? "#991b1b"
                                                            : "#92400e"
                                                }}
                                            >
                                                {
                                                    record.status
                                                }
                                            </span>

                                        </td>


                                        <td style={cellStyle}>
                                            {
                                                record.remarks ||
                                                "-"
                                            }
                                        </td>


                                        <td
                                            style={{
                                                padding:
                                                    "10px",
                                                textAlign:
                                                    "center"
                                            }}
                                        >

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    justifyContent:
                                                        "center",
                                                    gap:
                                                        "6px"
                                                }}
                                            >

                                                {/* View */}

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/attendance-management/view/${record.attendance_id}`
                                                        )
                                                    }
                                                    style={{
                                                        background:
                                                            "#3b82f6",
                                                        color:
                                                            "white",
                                                        border:
                                                            "none",
                                                        padding:
                                                            "7px 12px",
                                                        borderRadius:
                                                            "6px",
                                                        cursor:
                                                            "pointer"
                                                    }}
                                                >
                                                    View
                                                </button>


                                                {/* Edit */}

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/attendance-management/edit/${record.attendance_id}`
                                                        )
                                                    }
                                                    style={{
                                                        background:
                                                            "#f59e0b",
                                                        color:
                                                            "white",
                                                        border:
                                                            "none",
                                                        padding:
                                                            "7px 12px",
                                                        borderRadius:
                                                            "6px",
                                                        cursor:
                                                            "pointer"
                                                    }}
                                                >
                                                    Edit
                                                </button>


                                                {/* Delete */}

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            record.attendance_id
                                                        )
                                                    }
                                                    style={{
                                                        background:
                                                            "#ef4444",
                                                        color:
                                                            "white",
                                                        border:
                                                            "none",
                                                        padding:
                                                            "7px 12px",
                                                        borderRadius:
                                                            "6px",
                                                        cursor:
                                                            "pointer"
                                                    }}
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};


/* Reusable styles */

const headerStyle: React.CSSProperties = {
    padding: "14px",
    textAlign: "center"
};

const cellStyle: React.CSSProperties = {
    padding: "14px",
    textAlign: "center"
};


export default Attendances;