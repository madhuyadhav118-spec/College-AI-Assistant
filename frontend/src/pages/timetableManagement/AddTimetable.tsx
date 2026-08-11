import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    addTimetable
} from "../../services/timetableService";

import {
    getAllDepartments
} from "../../services/departmentService";

import {
    getAllSubjects
} from "../../services/subjectService";

import {
    getAllFaculty
} from "../../services/facultyService";

import type {
    TimetableFormData,
    //TimetableDay
} from "../../types/timetable";


interface Department {
    department_id: number;
    department_name: string;
}


interface Subject {
    subject_id: number;
    subject_name: string;
    subject_code: string;
    department_id: number;
}


interface Faculty {
    faculty_id: number;
    employee_id: string;
    designation: string;
    department_id: number;
    users?: {
        full_name?: string;
    };
}


function AddTimetable() {

    const navigate = useNavigate();

    const [departments, setDepartments] =
        useState<Department[]>([]);

    const [subjects, setSubjects] =
        useState<Subject[]>([]);

    const [faculty, setFaculty] =
        useState<Faculty[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);


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


    useEffect(() => {

        const loadData = async () => {

            try {

                const [
                    departmentData,
                    subjectData,
                    facultyData
                ] = await Promise.all([

                    getAllDepartments(),

                    getAllSubjects(),

                    getAllFaculty()

                ]);


                setDepartments(
                    departmentData
                );

                setSubjects(
                    subjectData
                );

                setFaculty(
                    facultyData
                );


            } catch (error) {

                console.error(
                    "Failed to load timetable data:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        loadData();

    }, []);


    const handleChange = (
        e:
            React.ChangeEvent<
                HTMLInputElement |
                HTMLSelectElement
            >
    ) => {

        const {
            name,
            value
        } = e.target;


        setFormData((prev) => ({

            ...prev,

            [name]:
                name === "subject_id" ||
                name === "faculty_id" ||
                name === "department_id"

                    ? Number(value)

                    : value

        }));

    };


    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();


        if (
            formData.department_id === 0 ||
            formData.subject_id === 0 ||
            formData.faculty_id === 0
        ) {

            alert(
                "Please select Department, Subject and Faculty."
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


            await addTimetable(
                formData
            );


            alert(
                "Timetable added successfully!"
            );


            navigate(
                "/timetable-management"
            );


        } catch (error) {

            console.error(
                "Failed to add timetable:",
                error
            );


            alert(
                "Failed to add timetable"
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
                    Loading...
                </h2>

            </div>
        );

    }


    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>
                Add Timetable
            </h1>


            <form
                onSubmit={handleSubmit}
                style={{
                    maxWidth: "550px",
                    marginTop: "25px"
                }}
            >


                {/* Department */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        Department
                    </label>


                    <select
                        name="department_id"
                        value={
                            formData.department_id
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px"
                        }}
                    >

                        <option value={0}>
                            Select Department
                        </option>


                        {departments.map(
                            (department) => (

                                <option
                                    key={
                                        department
                                            .department_id
                                    }
                                    value={
                                        department
                                            .department_id
                                    }
                                >

                                    {
                                        department
                                            .department_name
                                    }

                                </option>

                            )
                        )}

                    </select>

                </div>


                {/* Subject */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        Subject
                    </label>


                    <select
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
                            marginTop: "6px"
                        }}
                    >

                        <option value={0}>
                            Select Subject
                        </option>


                        {subjects
                            .filter(
                                (subject) =>
                                    formData.department_id === 0 ||
                                    subject.department_id ===
                                        formData.department_id
                            )
                            .map(
                                (subject) => (

                                    <option
                                        key={
                                            subject
                                                .subject_id
                                        }
                                        value={
                                            subject
                                                .subject_id
                                        }
                                    >

                                        {
                                            subject
                                                .subject_name
                                        }
                                        {" - "}
                                        {
                                            subject
                                                .subject_code
                                        }

                                    </option>

                                )
                            )}

                    </select>

                </div>


                {/* Faculty */}

                <div
                    style={{
                        marginBottom: "18px"
                    }}
                >

                    <label>
                        Faculty
                    </label>


                    <select
                        name="faculty_id"
                        value={
                            formData.faculty_id
                        }
                        onChange={
                            handleChange
                        }
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px"
                        }}
                    >

                        <option value={0}>
                            Select Faculty
                        </option>


                        {faculty
                            .filter(
                                (member) =>
                                    formData.department_id === 0 ||
                                    member.department_id ===
                                        formData.department_id
                            )
                            .map(
                                (member) => (

                                    <option
                                        key={
                                            member
                                                .faculty_id
                                        }
                                        value={
                                            member
                                                .faculty_id
                                        }
                                    >

                                        {
                                            member.users
                                                ?.full_name ||
                                            member.employee_id
                                        }

                                        {" - "}

                                        {
                                            member
                                                .designation
                                        }

                                    </option>

                                )
                            )}

                    </select>

                </div>


                {/* Day */}

                <div
                    style={{
                        marginBottom: "18px"
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
                            marginTop: "6px"
                        }}
                    >

                        <option value="Monday">
                            Monday
                        </option>

                        <option value="Tuesday">
                            Tuesday
                        </option>

                        <option value="Wednesday">
                            Wednesday
                        </option>

                        <option value="Thursday">
                            Thursday
                        </option>

                        <option value="Friday">
                            Friday
                        </option>

                        <option value="Saturday">
                            Saturday
                        </option>

                    </select>

                </div>


                {/* Start Time */}

                <div
                    style={{
                        marginBottom: "18px"
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
                            marginTop: "6px"
                        }}
                    />

                </div>


                {/* End Time */}

                <div
                    style={{
                        marginBottom: "18px"
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
                            marginTop: "6px"
                        }}
                    />

                </div>


                {/* Room */}

                <div
                    style={{
                        marginBottom: "25px"
                    }}
                >

                    <label>
                        Room Number
                    </label>


                    <input
                        type="text"
                        name="room_number"
                        value={
                            formData.room_number
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Example: C-301"
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginTop: "6px"
                        }}
                    />

                </div>


                <button
                    type="submit"
                    disabled={saving}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        marginRight: "10px"
                    }}
                >

                    {saving
                        ? "Saving..."
                        : "Save Timetable"}

                </button>


                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/timetable-management"
                        )
                    }
                    style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >

                    Cancel

                </button>

            </form>

        </div>

    );

}


export default AddTimetable;