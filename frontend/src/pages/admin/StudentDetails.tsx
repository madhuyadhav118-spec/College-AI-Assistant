import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getStudentById } from "../../services/studentService";
import type { Student } from "../../types/student";

function StudentDetails() {

    const { id } = useParams();

    const [student, setStudent] = useState<Student | null>(null);
        useEffect(() => {

        const loadStudent = async () => {

            try {

                const data = await getStudentById(id!);

                console.log("Student Details:", data);

                setStudent(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadStudent();

    }, [id]);
    return (

        <div style={{ padding: "30px" }}>

            <h1>Student Details</h1>

            <div
            style={{
                background: "#ffffff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,.08)",
                maxWidth: "700px"
            }}
        >

            <h2
                style={{
                    marginBottom: "25px",
                    color: "#2563eb"
                }}
            >
                👤 Student Profile
            </h2>

            <p><strong>Full Name:</strong> {student?.users.full_name}</p>

            <p><strong>Roll Number:</strong> {student?.roll_number}</p>

            <p><strong>Email:</strong> {student?.users.email}</p>

            <p><strong>Phone:</strong> {student?.users.phone || "-"}</p>

            <hr />

            <p><strong>Department:</strong> {student?.departments?.department_name || "Not Assigned"}</p>

            <p><strong>Year:</strong> {student?.year}</p>

            <p><strong>Semester:</strong> {student?.semester}</p>

            <p><strong>Status:</strong> {student?.status}</p>

            <hr />

            <p><strong>Parent Name:</strong> {student?.parent_name || "-"}</p>

            <p><strong>Parent Phone:</strong> {student?.parent_phone || "-"}</p>

            <p><strong>Address:</strong> {student?.address || "-"}</p>

        </div>

        </div>

    );

}

export default StudentDetails;