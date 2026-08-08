import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStudentById, updateStudent } from "../../services/studentService";

function EditStudent() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        roll_number: "",
        year: 1,
        semester: 1,
        status: "ACTIVE",
    });
    

    
    useEffect(() => {
    const loadStudent = async () => {
        try {
            if (!id) return;

            const data = await getStudentById(id);

            console.log(data);

            setFormData({
                full_name: data.users?.full_name || "",
                email: data.users?.email || "",
                phone: data.users?.phone || "",
                roll_number: data.roll_number || "",
                year: data.year || 1,
                semester: data.semester || 1,
                status: data.status || "ACTIVE",
            });
        } catch (error) {
            console.error(error);
        }
    };

    loadStudent();
}, [id]);

            const handleUpdate = async () => {

            try {

                await updateStudent(id!, formData);

                alert("Student updated successfully!");

                navigate("/students");

            } catch (error) {

                console.error(error);

                alert("Failed to update student.");

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
            <h1>Edit Student</h1>

            <div style={{ marginTop: "20px" }}>
                <label>Full Name</label>

                <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            full_name: e.target.value,
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

            <div>
                <label>Email</label>

                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value,
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

            <div>
                <label>Phone</label>

                <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            phone: e.target.value,
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

            <div>
                <label>Roll Number</label>

                <input
                    type="text"
                    value={formData.roll_number}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            roll_number: e.target.value,
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

            <div>
                <label>Status</label>

                <select
                    value={formData.status}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            status: e.target.value,
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px",
                    }}
                >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                </select>
            </div>

            <div
                style={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "flex-end",
                }}
            >

                <button
                    onClick={handleUpdate}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "12px 25px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "16px"
                    }}
                >
                    Save Changes
                </button>

            </div>
        </div>
    );
}

export default EditStudent;