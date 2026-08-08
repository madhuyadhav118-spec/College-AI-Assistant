import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    getDepartmentById,
    updateDepartment,
} from "../../services/departmentService";

function EditDepartment() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        department_name: "",
        department_code: "",
        hod_name: "",
        email: "",
        phone: "",
        building_name: "",
    });

    useEffect(() => {

        const loadDepartment = async () => {

            try {

                const data = await getDepartmentById(id!);

                console.log(data);

                setFormData({
                    department_name: data.department_name || "",
                    department_code: data.department_code || "",
                    hod_name: data.hod_name || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    building_name: data.building_name || "",
                });

            } catch (error) {

                console.error(error);

            }

        };

        loadDepartment();

    }, [id]);

    const handleSubmit = async () => {

        try {

            await updateDepartment(id!, formData);

            alert("Department Updated Successfully!");

            navigate("/departments");

        } catch (error) {

            console.error(error);

            alert("Failed to update department.");

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
                boxShadow: "0 4px 10px rgba(0,0,0,.1)",
            }}
        >

            <h1>Edit Department</h1>

            <div style={{ marginTop: "20px" }}>

                <label>Department Name</label>

                <input
                    type="text"
                    value={formData.department_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            department_name: e.target.value,
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
                            department_code: e.target.value,
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
                            hod_name: e.target.value,
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
                            email: e.target.value,
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
                            phone: e.target.value,
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
                            building_name: e.target.value,
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
                        fontWeight: "bold",
                    }}
                >
                    Save Changes
                </button>

            </div>

        </div>

    );

}

export default EditDepartment;