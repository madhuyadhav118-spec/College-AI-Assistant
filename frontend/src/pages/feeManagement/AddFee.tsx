import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addFee } from "../../services/feeService";
import type { FeeFormData } from "../../types/fee";

const AddFee = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        student_id: "",
        academic_year: "",
        semester: "",
        total_fee: "",
        amount_paid: "0",
        balance: "",
        due_date: "",
        payment_status: "PENDING",
        remarks: ""
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = e.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        try {

            setSaving(true);

            const data: FeeFormData = {
                student_id: Number(formData.student_id),
                academic_year: formData.academic_year,
                semester: Number(formData.semester),
                total_fee: Number(formData.total_fee),
                amount_paid: Number(formData.amount_paid),
                balance: Number(formData.balance),
                due_date: formData.due_date
                    ? `${formData.due_date}T00:00:00.000Z`
                    : undefined,
                payment_status: formData.payment_status,
                remarks: formData.remarks
            };

            await addFee(data);

            alert("Fee added successfully");

            navigate("/fee-management");

        } catch (err) {

            console.error(err);

            alert("Failed to add fee");

        } finally {

            setSaving(false);

        }

    };

    return (

        <div style={{ padding: "30px", maxWidth: "650px", margin: "0 auto" }}>

            <h1>Add Fee</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                <input type="number" name="student_id" placeholder="Student ID" value={formData.student_id} onChange={handleChange} required />

                <input type="text" name="academic_year" placeholder="Academic Year (2026-27)" value={formData.academic_year} onChange={handleChange} required />

                <input type="number" name="semester" placeholder="Semester" value={formData.semester} onChange={handleChange} required />

                <input type="number" name="total_fee" placeholder="Total Fee" value={formData.total_fee} onChange={handleChange} required />

                <input type="number" name="amount_paid" placeholder="Amount Paid" value={formData.amount_paid} onChange={handleChange} required />

                <input type="number" name="balance" placeholder="Balance" value={formData.balance} onChange={handleChange} required />

                <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />

                <input type="text" name="payment_status" placeholder="Payment Status" value={formData.payment_status} onChange={handleChange} />

                <input type="text" name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleChange} />

                <button type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Add Fee"}
                </button>

            </form>

        </div>

    );
};

export default AddFee;