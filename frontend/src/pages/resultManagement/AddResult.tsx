import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addResult } from "../../services/resultService";
import type { ResultFormData } from "../../types/result";

const AddResult = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        student_id: "",
        subject_id: "",
        exam_id: "",
        marks_obtained: "",
        grade: ""
    });

    const [saving, setSaving] = useState(false);

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

        try {

            setSaving(true);

            const dataToSend: ResultFormData = {

                student_id: Number(formData.student_id),

                subject_id: Number(formData.subject_id),

                exam_id: Number(formData.exam_id),

                marks_obtained: Number(formData.marks_obtained),

                grade: formData.grade

            };

            await addResult(dataToSend);

            alert("Result added successfully");

            navigate("/result-management");

        } catch (error) {

            console.error(
                "Failed to add result:",
                error
            );

            alert("Failed to add result");

        } finally {

            setSaving(false);

        }

    };

    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "600px",
                margin: "0 auto"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                Add Result
            </h1>

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
                        placeholder="A+, O, A..."
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
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: "bold"
                        }}
                    >
                        {saving ? "Saving..." : "Add Result"}
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

export default AddResult;