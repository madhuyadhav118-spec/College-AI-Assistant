/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllResults,
    deleteResult
} from "../../services/resultService";

import type { Result } from "../../types/result";

const Results = () => {

    const [results, setResults] = useState<Result[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        let cancelled = false;

        const loadData = async () => {

            try {

                const data = await getAllResults();

                if (!cancelled) {
                    setResults(data);
                    setError("");
                    setLoading(false);
                }

            } catch (err) {

                console.error(err);

                if (!cancelled) {
                    setError("Failed to load results");
                    setLoading(false);
                }
            }
        };

        loadData();

        return () => {
            cancelled = true;
        };

    }, []);

    const handleDelete = async (id: string) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this result?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteResult(id);

            setResults(previous =>
                previous.filter(
                    result =>
                        String(result.result_id) !== id
                )
            );

            alert("Result deleted successfully");

        } catch (err) {

            console.error(err);

            alert("Failed to delete result");
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading results...</h2>
            </div>
        );
    }

    return (

        <div style={{ padding: "30px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h1>Result Management</h1>

                <button
                    onClick={() =>
                        navigate("/result-management/add")
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
                    + Add Result
                </button>

            </div>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >

                <thead>

                    <tr style={{ background: "#f3f4f6" }}>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Student ID</th>
                        <th style={thStyle}>Exam ID</th>
                        <th style={thStyle}>Marks</th>
                        <th style={thStyle}>Grade</th>
                        <th style={thStyle}>Actions</th>
                    </tr>

                </thead>

                <tbody>

                    {results.length === 0 ? (

                        <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "25px" }}>
                                No results found.
                            </td>
                        </tr>

                    ) : (

                        results.map((result) => (

                            <tr key={result.result_id}>

                                <td style={tdStyle}>{result.result_id}</td>
                                <td style={tdStyle}>{result.student_id}</td>
                                <td style={tdStyle}>{result.exam_id}</td>
                                <td style={tdStyle}>{result.marks_obtained}</td>
                                <td style={tdStyle}>{result.grade}</td>

                                <td style={tdStyle}>

                                    <div style={{ display: "flex", gap: "8px" }}>

                                        <button
                                            onClick={() =>
                                                navigate(`/result-management/view/${result.result_id}`)
                                            }
                                            style={viewButton}
                                        >
                                            View
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(`/result-management/edit/${result.result_id}`)
                                            }
                                            style={editButton}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(String(result.result_id))
                                            }
                                            style={deleteButton}
                                        >
                                            Delete
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </div>
    );
};

const thStyle = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left" as const
};

const tdStyle = {
    border: "1px solid #ddd",
    padding: "10px"
};

const viewButton = {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

const editButton = {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

const deleteButton = {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

export default Results;