import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addStudent } from "../../services/studentService";

function AddStudent() {

    const [formData, setFormData] = useState({

        full_name: "",
        email: "",
        phone: "",
        roll_number: "",
        year: 1,
        semester: 1,
        department: "CSE",
        status: "ACTIVE",

    });

    const navigate = useNavigate();


        const handleSubmit = async () => {

        try {

            await addStudent(formData);

            alert("Student Added Successfully!");

            navigate("/students");

        } catch (error) {

            console.error(error);

            alert("Failed to add student.");

        }

    };
    return (
    <div
        style={{
            maxWidth: "700px",
            margin: "30px auto",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
        }}
    >
        <h1>Add Student</h1>

        {/* Full Name */}
        <div style={{ marginTop: "20px" }}>
            <label>Full Name</label>
            <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                    setFormData({ ...formData, full_name: e.target.value })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            />
        </div>

        {/* Email */}
        <div>
            <label>Email</label>
            <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            />
        </div>

        {/* Phone */}
        <div>
            <label>Phone</label>
            <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            />
        </div>

        {/* Roll Number */}
        <div>
            <label>Roll Number</label>
            <input
                type="text"
                value={formData.roll_number}
                onChange={(e) =>
                    setFormData({ ...formData, roll_number: e.target.value })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            />
        </div>

        {/* Department */}
        <div>
            <label>Department</label>
            <select
                value={formData.department}
                onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="MECH">MECH</option>
                <option value="CIVIL">CIVIL</option>
            </select>
        </div>

        {/* Year */}
        <div>
            <label>Year</label>
            <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        year: Number(e.target.value),
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            />
        </div>

        {/* Semester */}
        <div>
            <label>Semester</label>
            <input
                type="number"
                value={formData.semester}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        semester: Number(e.target.value),
                    })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            />
        </div>

        {/* Status */}
        <div>
            <label>Status</label>
            <select
                value={formData.status}
                onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                }
                style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    marginBottom: "20px",
                }}
            >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
            </select>
        </div>

        {/* Button */}
        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
            }}
        >
            <button
                onClick={handleSubmit}
                style={{
                    background: "#2563eb",
                    color: "white",
                    border: "none",
                    padding: "12px 25px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                }}
            >
                Add Student
            </button>
        </div>
    </div>
);
}

export default AddStudent;