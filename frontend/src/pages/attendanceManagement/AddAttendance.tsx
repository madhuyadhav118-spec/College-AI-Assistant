import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAttendance } from "../../services/attendanceService";
import type {
    AttendanceFormData,
    //AttendanceStatus
} from "../../types/attendance";

const AddAttendance = () => {
    const navigate = useNavigate();

    const [formData, setFormData] =
        useState<AttendanceFormData>({
            student_id: 0,
            faculty_id: 0,
            attendance_date: "",
            status: "PRESENT",
            remarks: ""
        });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
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

        try {
            await addAttendance(formData);

            alert(
                "Attendance added successfully!"
            );

            navigate("/attendance-management");
        } catch (error) {
            console.error(
                "Failed to add attendance:",
                error
            );

            alert(
                "Failed to add attendance."
            );
        }
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Add Attendance</h1>

            <form onSubmit={handleSubmit}>

                {/* Student ID */}
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Student ID
                    </label>

                    <input
                        type="number"
                        name="student_id"
                        value={formData.student_id}
                        onChange={handleChange}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "8px"
                        }}
                    />
                </div>

                {/* Faculty ID */}
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Faculty ID
                    </label>

                    <input
                        type="number"
                        name="faculty_id"
                        value={formData.faculty_id}
                        onChange={handleChange}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "8px"
                        }}
                    />
                </div>

                {/* Attendance Date */}
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Attendance Date
                    </label>

                    <input
                        type="date"
                        name="attendance_date"
                        value={formData.attendance_date}
                        onChange={handleChange}
                        required
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "8px"
                        }}
                    />
                </div>

                {/* Status */}
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Status
                    </label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "8px"
                        }}
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
                <div style={{ marginBottom: "15px" }}>
                    <label>
                        Remarks
                    </label>

                    <textarea
                        name="remarks"
                        value={
                            formData.remarks ?? ""
                        }
                        onChange={handleChange}
                        rows={4}
                        style={{
                            display: "block",
                            width: "100%",
                            padding: "8px"
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Add Attendance
                </button>

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/attendance-management"
                        )
                    }
                    style={{
                        marginLeft: "10px",
                        padding: "10px 20px",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Cancel
                </button>

            </form>
        </div>
    );
};

export default AddAttendance;