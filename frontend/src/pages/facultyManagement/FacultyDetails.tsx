import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getFacultyById } from "../../services/facultyService";
import type { Faculty } from "../../types/faculty";

function FacultyDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [faculty, setFaculty] = useState<Faculty | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadFaculty = async () => {

            if (!id) {
                return;
            }

            try {

                const data = await getFacultyById(id);

                console.log(data);

                setFaculty(data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        loadFaculty();

    }, [id]);

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading Faculty...</h2>
            </div>
        );
    }

    if (!faculty) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Faculty not found</h2>

                <button
                    onClick={() => navigate("/faculty-management")}
                >
                    Back to Faculty
                </button>
            </div>
        );
    }

    return (

        <div
            style={{
                maxWidth: "800px",
                margin: "30px auto",
                background: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
            }}
        >

            <h1>Faculty Details</h1>

            <div style={{ marginTop: "25px" }}>

                <p>
                    <strong>Faculty ID:</strong>{" "}
                    {faculty.faculty_id}
                </p>

                <p>
                    <strong>Name:</strong>{" "}
                    {faculty.users?.full_name || "-"}
                </p>

                <p>
                    <strong>Email:</strong>{" "}
                    {faculty.users?.email || "-"}
                </p>

                <p>
                    <strong>Phone:</strong>{" "}
                    {faculty.users?.phone || "-"}
                </p>

                <p>
                    <strong>Employee ID:</strong>{" "}
                    {faculty.employee_id}
                </p>

                <p>
                    <strong>Department:</strong>{" "}
                    {faculty.departments?.department_name ||
                        faculty.department ||
                        "-"}
                </p>

                <p>
                    <strong>Designation:</strong>{" "}
                    {faculty.designation || "-"}
                </p>

                <p>
                    <strong>Qualification:</strong>{" "}
                    {faculty.qualification || "-"}
                </p>

                <p>
                    <strong>Experience:</strong>{" "}
                    {faculty.experience ?? 0} years
                </p>

                <p>
                    <strong>Joining Date:</strong>{" "}
                    {faculty.joining_date
                        ? faculty.joining_date.substring(0, 10)
                        : "-"}
                </p>

                <p>
                    <strong>Office Phone:</strong>{" "}
                    {faculty.office_phone || "-"}
                </p>

                <p>
                    <strong>Status:</strong>{" "}
                    {faculty.status || "ACTIVE"}
                </p>

            </div>

            <button
                onClick={() => navigate("/faculty-management")}
                style={{
                    marginTop: "20px",
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    cursor: "pointer"
                }}
            >
                Back to Faculty
            </button>

        </div>

    );
}

export default FacultyDetails;