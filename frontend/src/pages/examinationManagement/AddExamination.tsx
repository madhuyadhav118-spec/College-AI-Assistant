
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addExamination } from "../../services/examinationService";
import type {
    ExaminationFormData
} from "../../types/examination";


const AddExamination = () => {

    const navigate = useNavigate();

    const [formData, setFormData] =
        useState<ExaminationFormData>({
            subject_id: 0,
            exam_name: "",
            exam_type: "MID1",
            exam_date: "",
            start_time: "",
            end_time: "",
            venue: "",
            total_marks: 100
        });

    const [error, setError] =
        useState<string>("");

    const [loading, setLoading] =
        useState<boolean>(false);


    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                name === "subject_id" ||
                name === "total_marks"
                    ? Number(value)
                    : value
        }));
    };


    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");


        if (formData.subject_id <= 0) {

            setError(
                "Please enter a valid subject ID."
            );

            return;
        }


        if (!formData.exam_name.trim()) {

            setError(
                "Please enter the exam name."
            );

            return;
        }


        if (!formData.exam_date) {

            setError(
                "Please select the exam date."
            );

            return;
        }


        if (!formData.start_time) {

            setError(
                "Please select the start time."
            );

            return;
        }


        if (!formData.end_time) {

            setError(
                "Please select the end time."
            );

            return;
        }


        if (
            formData.start_time >=
            formData.end_time
        ) {

            setError(
                "End time must be after start time."
            );

            return;
        }


        try {

            setLoading(true);


            /*
             * Prisma expects DateTime for
             * start_time and end_time.
             *
             * We convert the HTML time value
             * into an ISO-compatible DateTime.
             */

            const startDateTime =
                `1970-01-01T${formData.start_time}:00.000Z`;

            const endDateTime =
                `1970-01-01T${formData.end_time}:00.000Z`;


            const dataToSend = {

                subject_id:
                    formData.subject_id,

                exam_name:
                    formData.exam_name.trim(),

                exam_type:
                    formData.exam_type,

                exam_date:
                    formData.exam_date,

                start_time:
                    startDateTime,

                end_time:
                    endDateTime,

                venue:
                    formData.venue?.trim() || null,

                total_marks:
                    formData.total_marks || 100

            };


            await addExamination(
                dataToSend
            );


            alert(
                "Examination added successfully!"
            );


            navigate(
                "/examination-management"
            );


        } catch (error) {

            console.error(
                "Failed to create examination:",
                error
            );


            setError(
                "Failed to create examination."
            );

        } finally {

            setLoading(false);

        }
    };


    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "700px",
                margin: "0 auto"
            }}
        >

            <h1>
                Add Examination
            </h1>


            {error && (

                <p
                    style={{
                        color: "red",
                        marginBottom: "15px"
                    }}
                >
                    {error}
                </p>

            )}


            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}
            >

                {/* Subject ID */}

                <div>

                    <label>
                        Subject ID
                    </label>

                    <input
                        type="number"
                        name="subject_id"
                        value={
                            formData.subject_id || ""
                        }
                        onChange={handleChange}
                        min="1"
                        required
                        style={inputStyle}
                    />

                </div>


                {/* Exam Name */}

                <div>

                    <label>
                        Exam Name
                    </label>

                    <input
                        type="text"
                        name="exam_name"
                        value={
                            formData.exam_name
                        }
                        onChange={handleChange}
                        placeholder="Example: Mathematics Mid 1"
                        required
                        style={inputStyle}
                    />

                </div>


                {/* Exam Type */}

                <div>

                    <label>
                        Exam Type
                    </label>

                    <select
                        name="exam_type"
                        value={
                            formData.exam_type
                        }
                        onChange={handleChange}
                        style={inputStyle}
                    >

                        <option value="MID1">
                            MID1
                        </option>

                        <option value="MID2">
                            MID2
                        </option>

                        <option value="SEMESTER">
                            SEMESTER
                        </option>

                        <option value="LAB">
                            LAB
                        </option>

                        <option value="PRACTICAL">
                            PRACTICAL
                        </option>

                    </select>

                </div>


                {/* Exam Date */}

                <div>

                    <label>
                        Exam Date
                    </label>

                    <input
                        type="date"
                        name="exam_date"
                        value={
                            formData.exam_date
                        }
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                </div>


                {/* Start Time */}

                <div>

                    <label>
                        Start Time
                    </label>

                    <input
                        type="time"
                        name="start_time"
                        value={
                            formData.start_time
                        }
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                </div>


                {/* End Time */}

                <div>

                    <label>
                        End Time
                    </label>

                    <input
                        type="time"
                        name="end_time"
                        value={
                            formData.end_time
                        }
                        onChange={handleChange}
                        required
                        style={inputStyle}
                    />

                </div>


                {/* Venue */}

                <div>

                    <label>
                        Venue
                    </label>

                    <input
                        type="text"
                        name="venue"
                        value={
                            formData.venue || ""
                        }
                        onChange={handleChange}
                        placeholder="Example: D-310"
                        style={inputStyle}
                    />

                </div>


                {/* Total Marks */}

                <div>

                    <label>
                        Total Marks
                    </label>

                    <input
                        type="number"
                        name="total_marks"
                        value={
                            formData.total_marks ?? 100
                        }
                        onChange={handleChange}
                        min="1"
                        style={inputStyle}
                    />

                </div>


                {/* Buttons */}

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginTop: "10px"
                    }}
                >

                    <button
                        type="submit"
                        disabled={loading}
                        style={saveButton}
                    >
                        {loading
                            ? "Saving..."
                            : "Add Examination"}
                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/examination-management"
                            )
                        }
                        style={cancelButton}
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
    marginTop: "5px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    boxSizing: "border-box" as const
};


const saveButton = {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer"
};


const cancelButton = {
    background: "#6b7280",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer"
};


export default AddExamination;

