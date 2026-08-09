import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
getFacultyById,
updateFaculty
} from "../../services/facultyService";
import type { FacultyFormData } from "../../types/faculty";

type FacultyEditFormData = Omit<
    FacultyFormData,
    "experience" | "status" | "department_id"
> & {
    experience: string;
    status: "ACTIVE" | "INACTIVE";
    department_id: number;
};
function EditFaculty() {


const { id } = useParams();
const navigate = useNavigate();

const [formData, setFormData] = useState<FacultyEditFormData>({
    full_name: "",
    email: "",
    phone: "",
    employee_id: "",
    department: "",
    department_id: 0 ,
    designation: "",
    qualification: "",
    experience: "",
    joining_date: "",
    office_phone: "",
    status: "ACTIVE"
});

const [loading, setLoading] = useState(true);

useEffect(() => {

    const loadFaculty = async () => {

        try {

            if (!id) {
                return;
            }

            const data = await getFacultyById(id);

            setFormData({
                full_name: data.users?.full_name || "",
                email: data.users?.email || "",
                phone: data.users?.phone || "",

                employee_id: data.employee_id || "",

                department: data.department || "",

                department_id: data.department_id ?? 0,

                designation: data.designation || "",

                qualification: data.qualification || "",

                experience:
                    data.experience !== null &&
                    data.experience !== undefined
                        ? String(data.experience)
                        : "",

                joining_date:
                    data.joining_date
                        ? data.joining_date.substring(0, 10)
                        : "",

                office_phone: data.office_phone || "",

                status: data.status || "ACTIVE"
            });

        } catch (error) {

            console.error("Failed to load faculty:", error);

        } finally {

            setLoading(false);

        }

    };

    loadFaculty();

}, [id]);


const handleChange = (
    e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement
    >
) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
        ...previous,
        [name]: value
    }));

};


const handleSubmit = async (
    e: React.FormEvent
) => {

    e.preventDefault();

    try {

        if (!id) {
            return;
        }

        await updateFaculty(id, {
    ...formData,
    experience: Number(formData.experience),
    status: formData.status as "ACTIVE" | "INACTIVE"
});

        alert("Faculty updated successfully!");

        navigate("/faculty-management");

    } catch (error) {

        console.error(
            "Failed to update faculty:",
            error
        );

        alert("Failed to update faculty.");

    }

};


if (loading) {

    return (
        <div style={{ padding: "30px" }}>
            <h2>Loading Faculty...</h2>
        </div>
    );

}


return (

    <div
        style={{
            padding: "30px",
            maxWidth: "700px",
            margin: "auto"
        }}
    >

        <h1>Edit Faculty</h1>

        <form onSubmit={handleSubmit}>

            <label>Full Name</label>

            <input
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
            />

            <br /><br />

            <label>Email</label>

            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />

            <br /><br />

            <label>Phone</label>

            <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
            />

            <br /><br />

            <label>Employee ID</label>

            <input
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
            />

            <br /><br />

            <label>Department</label>

            <input
                name="department"
                value={formData.department}
                onChange={handleChange}
            />

            <br /><br />

            <label>Designation</label>

            <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
            />

            <br /><br />

            <label>Qualification</label>

            <input
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
            />

            <br /><br />

            <label>Experience (Years)</label>

            <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
            />

            <br /><br />

            <label>Joining Date</label>

            <input
                type="date"
                name="joining_date"
                value={formData.joining_date}
                onChange={handleChange}
            />

            <br /><br />

            <label>Office Phone</label>

            <input
                name="office_phone"
                value={formData.office_phone}
                onChange={handleChange}
            />

            <br /><br />

            <label>Status</label>

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
            >

                <option value="ACTIVE">
                    ACTIVE
                </option>

                <option value="INACTIVE">
                    INACTIVE
                </option>

            </select>

            <br /><br />

            <button type="submit">
                Save Changes
            </button>

            <button
                type="button"
                onClick={() =>
                    navigate("/faculty-management")
                }
                style={{ marginLeft: "10px" }}
            >
                Cancel
            </button>

        </form>

    </div>

);


}

export default EditFaculty;


// function EditFaculty() {
//     return (
//         <div style={{ padding: "30px" }}>
//             <h1>Edit Faculty</h1>
//             <p>Edit Faculty Page Working...</p>
//         </div>
//     );
// }

// export default EditFaculty;