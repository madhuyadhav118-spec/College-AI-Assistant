
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getExaminationById,
    updateExamination
} from "../../services/examinationService";

import type {
    Examination,
    ExaminationFormData
} from "../../types/examination";


const examTypes: Examination["exam_type"][] = [
    "MID1",
    "MID2",
    "SEMESTER",
    "LAB",
    "PRACTICAL"
];


const EditExamination = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        subject_id: "",
        exam_name: "",
        exam_type: "MID1" as Examination["exam_type"],
        exam_date: "",
        start_time: "",
        end_time: "",
        venue: "",
        total_marks: "100"
    });


    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // Convert API date to yyyy-MM-dd
    const formatDateForInput = (date: string) => {

        if (!date) {
            return "";
        }

        return new Date(date)
            .toISOString()
            .split("T")[0];
    };


    // Convert API time to HH:mm
    const formatTimeForInput = (time: string) => {

        if (!time) {
            return "";
        }

        const date = new Date(time);

        return date
            .toISOString()
            .substring(11, 16);
    };


    // Load examination
    useEffect(() => {

        if (!id) {

            setError(
                "Invalid examination ID."
            );

            setLoading(false);

            return;
        }


        const loadExamination = async () => {

            try {

                const data =
                    await getExaminationById(id);


                setFormData({

                    subject_id:
                        String(data.subject_id),

                    exam_name:
                        data.exam_name,

                    exam_type:
                        data.exam_type,

                    exam_date:
                        formatDateForInput(
                            data.exam_date
                        ),

                    start_time:
                        formatTimeForInput(
                            data.start_time
                        ),

                    end_time:
                        formatTimeForInput(
                            data.end_time
                        ),

                    venue:
                        data.venue || "",

                    total_marks:
                        String(
                            data.total_marks ?? 100
                        )
                });


                setError("");

            } catch (err) {

                console.error(
                    "Failed to load examination:",
                    err
                );

                setError(
                    "Failed to load examination."
                );

            } finally {

                setLoading(false);
            }
        };


        loadExamination();

    }, [id]);


    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement
        >
    ) => {

        const {
            name,
            value
        } = e.target;


        setFormData(previous => ({

            ...previous,

            [name]:
                name === "exam_type"
                    ? value as Examination["exam_type"]
                    : value

        }));
    };


    // Submit
    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        if (!id) {

            setError(
                "Invalid examination ID."
            );

            return;
        }


        try {

            setSaving(true);

            setError("");


            /*
             * This type MUST be ExaminationFormData
             * because updateExamination() expects
             * ExaminationFormData.
             */

            const dataToSend: ExaminationFormData = {

                subject_id:
                    Number(
                        formData.subject_id
                    ),

                exam_name:
                    formData.exam_name,

                exam_type:
                    formData.exam_type,

                /*
                 * Backend/Prisma expects
                 * ISO-8601 DateTime.
                 */

                exam_date:
                    `${formData.exam_date}T00:00:00.000Z`,

                start_time:
                    `1970-01-01T${formData.start_time}:00.000Z`,

                end_time:
                    `1970-01-01T${formData.end_time}:00.000Z`,

                venue:
                    formData.venue || "",

                total_marks:
                    Number(
                        formData.total_marks
                    )
            };


            // EXACT service signature:
            // updateExamination(id, ExaminationFormData)

            await updateExamination(
                id,
                dataToSend
            );


            alert(
                "Examination updated successfully"
            );


            navigate(
                "/examination-management"
            );


        } catch (err) {

            console.error(
                "Failed to update examination:",
                err
            );

            setError(
                "Failed to update examination."
            );

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div
                style={{
                    padding: "30px"
                }}
            >

                <h2>
                    Loading examination...
                </h2>

            </div>
        );
    }


    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "700px",
                margin: "0 auto"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "25px"
                }}
            >
                Edit Examination
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
                    border: "1px solid #ddd"
                }}
            >

                {/* Subject ID */}

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        <strong>
                            Subject ID
                        </strong>
                    </label>

                    <input
                        type="number"
                        name="subject_id"
                        value={
                            formData.subject_id
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>


                {/* Exam Name */}

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        <strong>
                            Exam Name
                        </strong>
                    </label>

                    <input
                        type="text"
                        name="exam_name"
                        value={
                            formData.exam_name
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>


                {/* Exam Type */}

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        <strong>
                            Exam Type
                        </strong>
                    </label>

                    <select
                        name="exam_type"
                        value={
                            formData.exam_type
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    >

                        {examTypes.map(type => (

                            <option
                                key={type}
                                value={type}
                            >
                                {type}
                            </option>

                        ))}

                    </select>

                </div>


                {/* Exam Date */}

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        <strong>
                            Exam Date
                        </strong>
                    </label>

                    <input
                        type="date"
                        name="exam_date"
                        value={
                            formData.exam_date
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>


                {/* Start Time */}

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        <strong>
                            Start Time
                        </strong>
                    </label>

                    <input
                        type="time"
                        name="start_time"
                        value={
                            formData.start_time
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>


                {/* End Time */}

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        <strong>
                            End Time
                        </strong>
                    </label>

                    <input
                        type="time"
                        name="end_time"
                        value={
                            formData.end_time
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>


                {/* Venue */}

                <div style={{ marginBottom: "15px" }}>

                    <label>
                        <strong>
                            Venue
                        </strong>
                    </label>

                    <input
                        type="text"
                        name="venue"
                        value={
                            formData.venue
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter examination venue"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>


                {/* Total Marks */}

                <div style={{ marginBottom: "20px" }}>

                    <label>
                        <strong>
                            Total Marks
                        </strong>
                    </label>

                    <input
                        type="number"
                        name="total_marks"
                        value={
                            formData.total_marks
                        }
                        onChange={
                            handleChange
                        }
                        min="1"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px",
                            boxSizing: "border-box"
                        }}
                    />

                </div>


                {/* Buttons */}

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
                            background:
                                saving
                                    ? "#9ca3af"
                                    : "#f59e0b",
                            color: "white",
                            border: "none",
                            padding: "12px",
                            borderRadius: "6px",
                            cursor:
                                saving
                                    ? "not-allowed"
                                    : "pointer",
                            fontWeight: "bold"
                        }}
                    >

                        {saving
                            ? "Updating..."
                            : "Update Examination"}

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/examination-management"
                            )
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


export default EditExamination;

