//tsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getTimetableById,
    updateTimetable
} from "../../services/timetableService";

import type {
    Timetable,
    TimetableFormData,
    TimetableDay
} from "../../types/timetable";


const EditTimetable = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();


    const [formData, setFormData] =
        useState<TimetableFormData>({
            subject_id: 0,
            faculty_id: 0,
            department_id: 0,
            day_of_week: "Monday",
            start_time: "",
            end_time: "",
            room_number: ""
        });


    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);


    const days: TimetableDay[] = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];


    // Convert backend ISO time to HH:mm
    const formatTimeForInput = (
        value: string
    ): string => {

        if (!value) {
            return "";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "";
        }

        return date.toISOString().substring(11, 16);
    };


    // Load timetable
    useEffect(() => {

        const loadTimetable = async () => {

            try {

                if (!id) {
                    return;
                }

                const data: Timetable =
                    await getTimetableById(id);


                setFormData({
                    subject_id: data.subject_id,

                    faculty_id: data.faculty_id,

                    department_id:
                        data.department_id,

                    day_of_week:
                        data.day_of_week,

                    start_time:
                        formatTimeForInput(
                            data.start_time
                        ),

                    end_time:
                        formatTimeForInput(
                            data.end_time
                        ),

                    room_number:
                        data.room_number ?? ""
                });

            } catch (error) {

                console.error(
                    "Failed to load timetable:",
                    error
                );

                alert(
                    "Failed to load timetable."
                );

            } finally {

                setLoading(false);

            }
        };


        loadTimetable();

    }, [id]);


    // Handle input changes
    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement |
            HTMLSelectElement
        >
    ) => {

        const { name, value } =
            event.target;


        if (
            name === "subject_id" ||
            name === "faculty_id" ||
            name === "department_id"
        ) {

            setFormData(
                previous => ({
                    ...previous,

                    [name]: Number(value)
                })
            );

        } else {

            setFormData(
                previous => ({
                    ...previous,

                    [name]: value
                })
            );

        }
    };


    // Update timetable
    const handleSubmit = async (
        event: React.FormEvent
    ) => {

        event.preventDefault();


        if (!id) {

            alert(
                "Timetable ID is missing."
            );

            return;
        }


        if (
            formData.subject_id <= 0 ||
            formData.faculty_id <= 0 ||
            formData.department_id <= 0
        ) {

            alert(
                "Subject ID, Faculty ID and Department ID must be valid."
            );

            return;
        }


        if (
            !formData.start_time ||
            !formData.end_time
        ) {

            alert(
                "Please select start and end time."
            );

            return;
        }


        try {

            setSaving(true);


            await updateTimetable(
                id,
                formData
            );


            alert(
                "Timetable updated successfully!"
            );


            navigate(
                "/timetable-management"
            );

        } catch (error) {

            console.error(
                "Failed to update timetable:",
                error
            );

            alert(
                "Failed to update timetable."
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (
            <div
                style={{
                    padding: "30px",
                    textAlign: "center"
                }}
            >
                <h2>
                    Loading timetable...
                </h2>
            </div>
        );

    }


    return (

        <div
            style={{
                minHeight: "100vh",
                padding: "30px"
            }}
        >

            <h1>
                Edit Timetable
            </h1>


            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "600px",
                    margin: "30px auto",
                    padding: "25px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow:
                        "0 2px 10px rgba(0,0,0,0.15)"
                }}
            >


                {/* Subject ID */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Subject ID
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
                        min="1"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>


                {/* Faculty ID */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
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
                        min="1"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>


                {/* Department ID */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Department ID
                    </label>

                    <input
                        type="number"
                        name="department_id"
                        value={
                            formData.department_id
                        }
                        onChange={
                            handleChange
                        }
                        min="1"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    />

                </div>


                {/* Day */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Day
                    </label>

                    <select
                        name="day_of_week"
                        value={
                            formData.day_of_week
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
                        }}
                    >

                        {days.map(day => (

                            <option
                                key={day}
                                value={day}
                            >
                                {day}
                            </option>

                        ))}

                    </select>

                </div>


                {/* Start Time */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        Start Time
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
                            marginTop: "5px"
                        }}
                    />

                </div>


                {/* End Time */}

                <div
                    style={{
                        marginBottom: "15px"
                    }}
                >

                    <label>
                        End Time
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
                            marginTop: "5px"
                        }}
                    />

                </div>


                {/* Room */}

                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >

                    <label>
                        Room Number
                    </label>

                    <input
                        type="text"
                        name="room_number"
                        value={
                            formData.room_number ?? ""
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Example: D-310"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "5px"
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
                            padding: "12px",
                            background:
                                "#f59e0b",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >

                        {saving
                            ? "Updating..."
                            : "Update Timetable"}

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/timetable-management"
                            )
                        }
                        style={{
                            flex: 1,
                            padding: "12px",
                            background:
                                "#6b7280",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    );

};


export default EditTimetable;

