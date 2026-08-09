import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addFaculty } from "../../services/facultyService";
import { getAllDepartments } from "../../services/departmentService";
import type { Department } from "../../types/department";
import type { FacultyFormData } from "../../types/faculty";

function AddFaculty() {

    const navigate = useNavigate();

    const [departments, setDepartments] = useState<Department[]>([]);

    const [formData, setFormData] = useState<FacultyFormData>({
        full_name: "",
        email: "",
        phone: "",
        employee_id: "",
        department: "",
        designation: "",
        qualification: "",
        experience: 0,
        joining_date: "",
        office_phone: "",
        status: "ACTIVE",
        department_id: undefined
    });

    useEffect(() => {

        const loadDepartments = async () => {

            try {

                const data = await getAllDepartments();

                setDepartments(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadDepartments();

    }, []);

    const handleSubmit = async () => {

        try {

            await addFaculty(formData);

            alert("Faculty Added Successfully!");

            navigate("/faculty-management");

        } catch (error) {

            console.error(error);

            alert("Failed to add faculty.");

        }

    };

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

            <h1>Add Faculty</h1>

            {/* Full Name */}

            <div style={{ marginTop: "20px" }}>

                <label>Full Name</label>

                <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            full_name: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Email */}

            <div style={{ marginTop: "20px" }}>

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
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Phone */}

            <div style={{ marginTop: "20px" }}>

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
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Employee ID */}

            <div style={{ marginTop: "20px" }}>

                <label>Employee ID</label>

                <input
                    type="text"
                    value={formData.employee_id}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            employee_id: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Department */}

            <div style={{ marginTop: "20px" }}>

                <label>Department</label>

                <select
                    value={formData.department_id ?? ""}
                    onChange={(e) => {

                        const departmentId =
                            Number(e.target.value);

                        const selectedDepartment =
                            departments.find(
                                (department) =>
                                    department.department_id ===
                                    departmentId
                            );

                        setFormData({
                            ...formData,
                            department_id: departmentId,
                            department:
                                selectedDepartment?.department_name || ""
                        });

                    }}
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                >

                    <option value="">
                        Select Department
                    </option>

                    {departments.map((department) => (

                        <option
                            key={department.department_id}
                            value={department.department_id}
                        >
                            {department.department_name}
                        </option>

                    ))}

                </select>

            </div>

            {/* Designation */}

            <div style={{ marginTop: "20px" }}>

                <label>Designation</label>

                <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            designation: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Qualification */}

            <div style={{ marginTop: "20px" }}>

                <label>Qualification</label>

                <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            qualification: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Experience */}

            <div style={{ marginTop: "20px" }}>

                <label>Experience (Years)</label>

                <input
                    type="number"
                    min="0"
                    value={formData.experience}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            experience: Number(e.target.value)
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Joining Date */}

            <div style={{ marginTop: "20px" }}>

                <label>Joining Date</label>

                <input
                    type="date"
                    value={formData.joining_date}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            joining_date: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Office Phone */}

            <div style={{ marginTop: "20px" }}>

                <label>Office Phone</label>

                <input
                    type="text"
                    value={formData.office_phone}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            office_phone: e.target.value
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                />

            </div>

            {/* Status */}

            <div style={{ marginTop: "20px" }}>

                <label>Status</label>

                <select
                    value={formData.status}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            status:
                                e.target.value as
                                "ACTIVE" | "INACTIVE"
                        })
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginTop: "5px"
                    }}
                >

                    <option value="ACTIVE">
                        ACTIVE
                    </option>

                    <option value="INACTIVE">
                        INACTIVE
                    </option>

                </select>

            </div>

            {/* Buttons */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginTop: "30px"
                }}
            >

                <button
                    onClick={handleSubmit}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Save Faculty
                </button>

                <button
                    onClick={() =>
                        navigate("/faculty-management")
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

            </div>

        </div>

    );
}

export default AddFaculty;