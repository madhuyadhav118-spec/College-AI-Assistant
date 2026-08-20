/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getResultById,
    updateResult
} from "../../services/resultService";

import type { ResultFormData } from "../../types/result";

const EditResult = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        student_id: "",
        subject_id: "",
        exam_id: "",
        marks_obtained: "",
        grade: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        if (!id) {
            setError("Invalid Result ID");
            setLoading(false);
            return;
        }

        const load = async () => {

            try {

                const data = await getResultById(id);

                setFormData({
                    student_id: String(data.student_id),
                    subject_id: String(data.subject_id),
                    exam_id: String(data.exam_id),
                    marks_obtained: String(data.marks_obtained),
                    grade: data.grade ?? ""
                });

                setError("");

            } catch (err) {

                console.error("Failed to load result:", err);

                setError("Failed to load result.");

            } finally {

                setLoading(false);

            }

        };

        load();

    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        if (!id) {
            setError("Invalid Result ID");
            return;
        }

        try {

            setSaving(true);
            setError("");

            const dataToSend: ResultFormData = {
                student_id: Number(formData.student_id),
                subject_id: Number(formData.subject_id),
                exam_id: Number(formData.exam_id),
                marks_obtained: Number(formData.marks_obtained),
                grade: formData.grade
            };

            await updateResult(id, dataToSend);

            alert("Result updated successfully");

            navigate("/result-management");

        } catch (err) {

            console.error("Failed to update result:", err);

            setError("Failed to update result.");

        } finally {

            setSaving(false);

        }

    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading result...</h2>
            </div>
        );
    }

    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "650px",
                margin: "0 auto"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                Edit Result
            </h1>

            {error && (
                <p
                    style={{
                        color: "red",
                        textAlign: "center",
                        marginBottom: "15px"
                    }}
                >
                    {error}
                </p>
            )}

            <form
                onSubmit={handleSubmit}
                style={{
                    background: "white",
                    padding: "25px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >

                <div>
                    <label><strong>Student ID</strong></label>
                    <input
                        type="number"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label><strong>Subject ID</strong></label>
                    <input
                        type="number"
                        name="subject_id"
                        value={formData.subject_id}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label><strong>Exam ID</strong></label>
                    <input
                        type="number"
                        name="exam_id"
                        value={formData.exam_id}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label><strong>Marks Obtained</strong></label>
                    <input
                        type="number"
                        name="marks_obtained"
                        value={formData.marks_obtained}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label><strong>Grade</strong></label>
                    <input
                        type="text"
                        name="grade"
                        value={formData.grade}
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "10px"
                    }}
                >

                    <button
                        type="submit"
                        disabled={saving}
                        style={{
                            flex: 1,
                            background: saving ? "#9ca3af" : "#f59e0b",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "6px",
                            cursor: saving ? "not-allowed" : "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        {saving ? "Updating..." : "Update Result"}
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/result-management")
                        }
                        style={{
                            flex: 1,
                            background: "#6b7280",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>
    );

};

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    boxSizing: "border-box" as const
};

export default EditResult;