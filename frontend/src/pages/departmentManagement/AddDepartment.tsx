import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDepartment } from "../../services/departmentService";

function AddDepartment() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        department_name: "",
        department_code: "",
        hod_name: "",
        email: "",
        phone: "",
        building_name: "",
    });

    const handleSubmit = async () => {

        try {

            await addDepartment(formData);

            alert("Department Added Successfully!");

            navigate("/departments");

        } catch (error) {

            console.error(error);

            alert("Failed to add department.");

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
                boxShadow: "0 4px 10px rgba(0,0,0,.1)"
            }}
        >

            <h1>Add Department</h1>

            <div style={{ marginTop: "20px" }}>

                <label>Department Name</label>

                <input
                    type="text"
                    value={formData.department_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            department_name: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <label>Department Code</label>

                <input
                    type="text"
                    value={formData.department_code}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            department_code: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <label>HOD Name</label>

                <input
                    type="text"
                    value={formData.hod_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            hod_name: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <label>Email</label>

                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            email: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <label>Phone</label>

                <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            phone: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
                />

                <label>Building Name</label>

                <input
                    type="text"
                    value={formData.building_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            building_name: e.target.value
                        })
                    }
                    style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
                />

                <button
                    onClick={handleSubmit}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "12px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    Add Department
                </button>

            </div>

        </div>

    );

}

export default AddDepartment;