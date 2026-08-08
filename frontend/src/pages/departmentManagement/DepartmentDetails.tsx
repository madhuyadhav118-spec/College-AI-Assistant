import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartmentById } from "../../services/departmentService";
import type { Department } from "../../types/department";

function DepartmentDetails() {

    const { id } = useParams();

    const [department, setDepartment] = useState<Department | null>(null);

    useEffect(() => {

        const loadDepartment = async () => {

            try {

                const data = await getDepartmentById(id!);

                console.log(data);

                setDepartment(data);

            } catch (error) {

                console.error(error);

            }

        };

        loadDepartment();

    }, [id]);

    if (!department) {

        return <h2 style={{ padding: "30px" }}>Loading...</h2>;

    }

    return (

        <div
            style={{
                maxWidth: "700px",
                margin: "30px auto",
                background: "#fff",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,.1)"
            }}
        >

            <h1>Department Details</h1>

            <hr />

            <p><strong>Department ID:</strong> {department.department_id}</p>

            <p><strong>Department Name:</strong> {department.department_name}</p>

            <p><strong>Department Code:</strong> {department.department_code}</p>

            <p><strong>HOD Name:</strong> {department.hod_name}</p>

            <p><strong>Email:</strong> {department.email || "-"}</p>

            <p><strong>Phone:</strong> {department.phone || "-"}</p>

            <p><strong>Building:</strong> {department.building_name || "-"}</p>

        </div>

    );

}

export default DepartmentDetails;