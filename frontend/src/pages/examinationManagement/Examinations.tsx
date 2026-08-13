
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllExaminations,
    deleteExamination
} from "../../services/examinationService";

import type { Examination } from "../../types/examination";


// Format date
const formatDate = (date: string) => {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};


// Format time without converting UTC to local time
const formatExamTime = (time: string) => {
    if (!time) {
        return "-";
    }

    return new Date(time)
        .toISOString()
        .substring(11, 16);
};


const Examinations = () => {

    const [examinations, setExaminations] =
        useState<Examination[]>([]);

    const [loading, setLoading] =
        useState<boolean>(true);

    const [error, setError] =
        useState<string>("");

    const navigate = useNavigate();


    // Load examinations
    const loadExaminations = async () => {

        try {

            setLoading(true);

            const data =
                await getAllExaminations();

            setExaminations(data);

            setError("");

        } catch (error) {

            console.error(
                "Failed to load examinations:",
                error
            );

            setError(
                "Failed to load examinations"
            );

        } finally {

            setLoading(false);

        }
    };


    // Load data when page opens
    useEffect(() => {

        let cancelled = false;

        const loadData = async () => {

            try {

                const data =
                    await getAllExaminations();

                if (!cancelled) {

                    setExaminations(data);
                    setError("");
                    setLoading(false);

                }

            } catch (error) {

                console.error(
                    "Failed to load examinations:",
                    error
                );

                if (!cancelled) {

                    setError(
                        "Failed to load examinations"
                    );

                    setLoading(false);

                }

            }

        };


        loadData();


        return () => {

            cancelled = true;

        };

    }, []);


    // Delete examination
    const handleDelete = async (id: string) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this examination?"
        );

        if (!confirmed) {
            return;
        }


        try {

            await deleteExamination(id);


            // Remove deleted examination from table
            setExaminations(previous =>
                previous.filter(
                    exam =>
                        String(exam.exam_id) !== id
                )
            );


            alert(
                "Examination deleted successfully"
            );


        } catch (error) {

            console.error(
                "Failed to delete examination:",
                error
            );


            alert(
                "Failed to delete examination"
            );

        }

    };


    // Loading
    if (loading) {

        return (

            <div
                style={{
                    padding: "30px"
                }}
            >

                <h2>
                    Loading examinations...
                </h2>

            </div>

        );

    }


    // Error
    if (error) {

        return (

            <div
                style={{
                    padding: "30px"
                }}
            >

                <h2>
                    Examination Management
                </h2>


                <p
                    style={{
                        color: "red"
                    }}
                >
                    {error}
                </p>


                <button
                    onClick={loadExaminations}
                    style={{
                        padding: "8px 14px",
                        cursor: "pointer"
                    }}
                >
                    Retry
                </button>

            </div>

        );

    }


    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            {/* Header */}

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "30px",
                    marginBottom: "25px"
                }}
            >

                <h1
                    style={{
                        margin: 0,
                        fontSize: "32px",
                        whiteSpace: "nowrap"
                    }}
                >
                    Examination Management
                </h1>


                <button
                    onClick={() =>
                        navigate(
                            "/examination-management/add"
                        )
                    }
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "12px 24px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "16px",
                        fontWeight: "bold",
                        minWidth: "235px"
                    }}
                >
                    + Add Examination
                </button>

            </div>


            {/* Examination Table */}

            <div
                style={{
                    overflowX: "auto"
                }}
            >

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background: "#f3f4f6"
                            }}
                        >

                            <th style={thStyle}>
                                ID
                            </th>

                            <th style={thStyle}>
                                Exam Name
                            </th>

                            <th style={thStyle}>
                                Subject ID
                            </th>

                            <th style={thStyle}>
                                Exam Type
                            </th>

                            <th style={thStyle}>
                                Exam Date
                            </th>

                            <th style={thStyle}>
                                Start Time
                            </th>

                            <th style={thStyle}>
                                End Time
                            </th>

                            <th style={thStyle}>
                                Venue
                            </th>

                            <th style={thStyle}>
                                Total Marks
                            </th>

                            <th style={thStyle}>
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {examinations.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={10}
                                    style={{
                                        textAlign: "center",
                                        padding: "30px"
                                    }}
                                >
                                    No examinations found.
                                </td>

                            </tr>

                        ) : (

                            examinations.map(
                                (exam) => (

                                    <tr
                                        key={
                                            exam.exam_id
                                        }
                                    >

                                        <td style={tdStyle}>
                                            {
                                                exam.exam_id
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                exam.exam_name
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                exam.subject_id
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                exam.exam_type
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                formatDate(
                                                    exam.exam_date
                                                )
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                formatExamTime(
                                                    exam.start_time
                                                )
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                formatExamTime(
                                                    exam.end_time
                                                )
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                exam.venue ||
                                                "-"
                                            }
                                        </td>


                                        <td style={tdStyle}>
                                            {
                                                exam.total_marks ??
                                                100
                                            }
                                        </td>


                                        <td style={tdStyle}>

                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "8px"
                                                }}
                                            >

                                                {/* View */}

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/examination-management/view/${exam.exam_id}`
                                                        )
                                                    }
                                                    style={
                                                        viewButton
                                                    }
                                                >
                                                    View
                                                </button>


                                                {/* Edit */}

                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/examination-management/edit/${exam.exam_id}`
                                                        )
                                                    }
                                                    style={
                                                        editButton
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                {/* Delete */}

                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            String(
                                                                exam.exam_id
                                                            )
                                                        )
                                                    }
                                                    style={
                                                        deleteButton
                                                    }
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


// Table header style

const thStyle = {

    border: "1px solid #ddd",

    padding: "10px",

    textAlign: "left" as const

};


// Table cell style

const tdStyle = {

    border: "1px solid #ddd",

    padding: "10px"

};


// View button

const viewButton = {

    background: "#16a34a",

    color: "white",

    border: "none",

    padding: "6px 10px",

    borderRadius: "6px",

    cursor: "pointer"

};


// Edit button

const editButton = {

    background: "#f59e0b",

    color: "white",

    border: "none",

    padding: "6px 10px",

    borderRadius: "6px",

    cursor: "pointer"

};


// Delete button

const deleteButton = {

    background: "#ef4444",

    color: "white",

    border: "none",

    padding: "6px 10px",

    borderRadius: "6px",

    cursor: "pointer"

};


export default Examinations;

