import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getAttendanceById,
    updateAttendance
} from "../../services/attendanceService";

import type {
    AttendanceFormData,
    //AttendanceStatus
} from "../../types/attendance";


const EditAttendance = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState<AttendanceFormData>({
            student_id: 0,
            faculty_id: 0,
            attendance_date: "",
            status: "PRESENT",
            remarks: ""
        });

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // Load existing attendance
    useEffect(() => {

        if (!id) {
            return;
        }

        getAttendanceById(id)
            .then((data) => {

                setFormData({
                    student_id: Number(
                        data.student_id
                    ),

                    faculty_id: Number(
                        data.faculty_id
                    ),

                    attendance_date:
                        new Date(
                            data.attendance_date
                        )
                            .toISOString()
                            .split("T")[0],

                    status:
                        data.status ||
                        "PRESENT",

                    remarks:
                        data.remarks || ""
                });

            })
            .catch((err) => {

                console.error(
                    "Failed to load attendance:",
                    err
                );

                setError(
                    "Failed to load attendance."
                );

            })
            .finally(() => {

                setLoading(false);

            });

    }, [id]);


    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement |
            HTMLTextAreaElement
        >
    ) => {

        const { name, value } =
            e.target;

        setFormData((previous) => ({
            ...previous,

            [name]:
                name === "student_id" ||
                name === "faculty_id"
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

            await updateAttendance(
                id,
                formData
            );

            alert(
                "Attendance updated successfully!"
            );

            navigate(
                `/attendance-management/view/${id}`
            );

        } catch (err) {

            console.error(
                "Failed to update attendance:",
                err
            );

            alert(
                "Failed to update attendance."
            );

        }

    };


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


    if (!id) {

        return (
            <div
                style={{
                    padding: "40px",
                    textAlign: "center"
                }}
            >
                <h2>
                    Attendance ID is missing.
                </h2>
            </div>
        );

    }


    if (error) {

        return (
            <div
                style={{
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
                        cursor: "pointer"
                    }}
                >
                    Back
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
                        marginBottom: "8px"
                    }}
                >
                    Edit Attendance
                </h1>

                <p
                    style={{
                        color: "#64748b"
                    }}
                >
                    Attendance ID: {id}
                </p>

            </div>


            {/* Form */}

            <div
                style={{
                    maxWidth: "700px",
                    margin: "0 auto",
                    background: "white",
                    padding: "25px",
                    borderRadius: "10px",
                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.12)"
                }}
            >

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    {/* Student ID */}

                    <div
                        style={{
                            marginBottom: "18px"
                        }}
                    >

                        <label
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    "6px",
                                fontWeight:
                                    "bold"
                            }}
                        >
                            Student ID
                        </label>

                        <input
                            type="number"
                            name="student_id"
                            value={
                                formData.student_id
                            }
                            onChange={
                                handleChange
                            }
                            required
                            style={
                                inputStyle
                            }
                        />

                    </div>


                    {/* Faculty ID */}

                    <div
                        style={{
                            marginBottom: "18px"
                        }}
                    >

                        <label
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    "6px",
                                fontWeight:
                                    "bold"
                            }}
                        >
                            Faculty ID
                        </label>

                        <input
                            type="number"
                            name="faculty_id"
                            value={
                                formData.faculty_id
                            }
                            onChange={
                                handleChange
                            }
                            required
                            style={
                                inputStyle
                            }
                        />

                    </div>


                    {/* Date */}

                    <div
                        style={{
                            marginBottom: "18px"
                        }}
                    >

                        <label
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    "6px",
                                fontWeight:
                                    "bold"
                            }}
                        >
                            Attendance Date
                        </label>

                        <input
                            type="date"
                            name="attendance_date"
                            value={
                                formData.attendance_date
                            }
                            onChange={
                                handleChange
                            }
                            required
                            style={
                                inputStyle
                            }
                        />

                    </div>


                    {/* Status */}

                    <div
                        style={{
                            marginBottom: "18px"
                        }}
                    >

                        <label
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    "6px",
                                fontWeight:
                                    "bold"
                            }}
                        >
                            Status
                        </label>

                        <select
                            name="status"
                            value={
                                formData.status
                            }
                            onChange={
                                handleChange
                            }
                            style={
                                inputStyle
                            }
                        >

                            <option value="PRESENT">
                                Present
                            </option>

                            <option value="ABSENT">
                                Absent
                            </option>

                            <option value="LATE">
                                Late
                            </option>

                        </select>

                    </div>


                    {/* Remarks */}

                    <div
                        style={{
                            marginBottom: "25px"
                        }}
                    >

                        <label
                            style={{
                                display:
                                    "block",
                                marginBottom:
                                    "6px",
                                fontWeight:
                                    "bold"
                            }}
                        >
                            Remarks
                        </label>

                        <textarea
                            name="remarks"
                            value={
                                formData.remarks ||
                                ""
                            }
                            onChange={
                                handleChange
                            }
                            rows={4}
                            style={
                                inputStyle
                            }
                        />

                    </div>


                    {/* Buttons */}

                    <div
                        style={{
                            display:
                                "flex",
                            justifyContent:
                                "center",
                            gap: "10px"
                        }}
                    >

                        <button
                            type="submit"
                            style={{
                                background:
                                    "#f59e0b",
                                color: "white",
                                border:
                                    "none",
                                padding:
                                    "10px 20px",
                                borderRadius:
                                    "6px",
                                cursor:
                                    "pointer",
                                fontWeight:
                                    "bold"
                            }}
                        >
                            Update Attendance
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/attendance-management/view/${id}`
                                )
                            }
                            style={{
                                background:
                                    "#64748b",
                                color: "white",
                                border:
                                    "none",
                                padding:
                                    "10px 20px",
                                borderRadius:
                                    "6px",
                                cursor:
                                    "pointer"
                            }}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
};


const inputStyle: React.CSSProperties = {
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "6px",
    fontSize: "15px"
};


export default EditAttendance;