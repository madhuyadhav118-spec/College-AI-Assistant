import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getAttendanceById } from "../../services/attendanceService";

import type { Attendance } from "../../types/attendance";

const AttendanceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [attendance, setAttendance] =
        useState<Attendance | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!id) {
            return;
        }

        getAttendanceById(id)
            .then((data) => {
                setAttendance(data);
            })
            .catch((err) => {
                console.error(
                    "Failed to load attendance details:",
                    err
                );

                setError(
                    "Failed to load attendance details."
                );
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#e0f2fe",
                    padding: "40px",
                    textAlign: "center"
                }}
            >
                <h2>
                    Loading attendance details...
                </h2>
            </div>
        );
    }

    if (!id) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#e0f2fe",
                    padding: "40px",
                    textAlign: "center"
                }}
            >
                <h2>
                    Attendance ID is missing.
                </h2>

                <button
                    onClick={() =>
                        navigate(
                            "/attendance-management"
                        )
                    }
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginTop: "15px"
                    }}
                >
                    Back to Attendance
                </button>
            </div>
        );
    }

    if (error) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#e0f2fe",
                    padding: "40px",
                    textAlign: "center"
                }}
            >
                <h2
                    style={{
                        color: "#dc2626"
                    }}
                >
                    {error}
                </h2>

                <button
                    onClick={() =>
                        navigate(
                            "/attendance-management"
                        )
                    }
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginTop: "15px"
                    }}
                >
                    Back to Attendance
                </button>
            </div>
        );
    }

    if (!attendance) {
        return (
            <div
                style={{
                    minHeight: "100vh",
                    background: "#e0f2fe",
                    padding: "40px",
                    textAlign: "center"
                }}
            >
                <h2>
                    Attendance record not found.
                </h2>

                <button
                    onClick={() =>
                        navigate(
                            "/attendance-management"
                        )
                    }
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Back to Attendance
                </button>
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
                    Attendance Details
                </h1>

                <p
                    style={{
                        color: "#64748b",
                        margin: 0
                    }}
                >
                    Attendance ID:{" "}
                    {attendance.attendance_id}
                </p>
            </div>

            {/* Details Card */}

            <div
                style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    background: "white",
                    borderRadius: "10px",
                    padding: "25px",
                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.12)"
                }}
            >
                {/* Attendance ID */}

                <div style={rowStyle}>
                    <strong>
                        Attendance ID
                    </strong>

                    <span>
                        {attendance.attendance_id}
                    </span>
                </div>

                {/* Student ID */}

                <div style={rowStyle}>
                    <strong>
                        Student ID
                    </strong>

                    <span>
                        {attendance.student_id}
                    </span>
                </div>

                {/* Faculty ID */}

                <div style={rowStyle}>
                    <strong>
                        Faculty ID
                    </strong>

                    <span>
                        {attendance.faculty_id}
                    </span>
                </div>

                {/* Date */}

                <div style={rowStyle}>
                    <strong>
                        Attendance Date
                    </strong>

                    <span>
                        {new Date(
                            attendance.attendance_date
                        ).toLocaleDateString()}
                    </span>
                </div>

                {/* Status */}

                <div style={rowStyle}>
                    <strong>
                        Status
                    </strong>

                    <span
                        style={{
                            display: "inline-block",
                            padding: "5px 12px",
                            borderRadius: "15px",
                            fontWeight: "bold",
                            background:
                                attendance.status ===
                                "PRESENT"
                                    ? "#dcfce7"
                                    : attendance.status ===
                                      "ABSENT"
                                    ? "#fee2e2"
                                    : "#fef3c7",
                            color:
                                attendance.status ===
                                "PRESENT"
                                    ? "#166534"
                                    : attendance.status ===
                                      "ABSENT"
                                    ? "#991b1b"
                                    : "#92400e"
                        }}
                    >
                        {attendance.status || "-"}
                    </span>
                </div>

                {/* Remarks */}

                <div style={rowStyle}>
                    <strong>
                        Remarks
                    </strong>

                    <span>
                        {attendance.remarks || "-"}
                    </span>
                </div>

                {/* Created At */}

                {attendance.created_at && (
                    <div style={rowStyle}>
                        <strong>
                            Created At
                        </strong>

                        <span>
                            {new Date(
                                attendance.created_at
                            ).toLocaleString()}
                        </span>
                    </div>
                )}

                {/* Updated At */}

                {attendance.updated_at && (
                    <div style={rowStyle}>
                        <strong>
                            Updated At
                        </strong>

                        <span>
                            {new Date(
                                attendance.updated_at
                            ).toLocaleString()}
                        </span>
                    </div>
                )}

                {/* Buttons */}

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "10px",
                        marginTop: "25px"
                    }}
                >
                    <button
                        onClick={() =>
                            navigate(
                                "/attendance-management"
                            )
                        }
                        style={{
                            background: "#64748b",
                            color: "white",
                            border: "none",
                            padding: "9px 18px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        ← Back
                    </button>

                    <button
                        onClick={() =>
                            navigate(
                                `/attendance-management/edit/${attendance.attendance_id}`
                            )
                        }
                        style={{
                            background: "#f59e0b",
                            color: "white",
                            border: "none",
                            padding: "9px 18px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
};

const rowStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "200px 1fr",
    padding: "14px 0",
    borderBottom: "1px solid #e2e8f0",
    gap: "20px"
};

export default AttendanceDetails;