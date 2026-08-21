/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getFeeById,
    updateFee
} from "../../services/feeService";

import type { FeeFormData } from "../../types/fee";

const EditFee = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        student_id: "",
        academic_year: "",
        semester: "",
        total_fee: "",
        amount_paid: "",
        balance: "",
        due_date: "",
        payment_status: "",
        remarks: ""
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!id) {
            return;
        }

        const load = async () => {

            const data = await getFeeById(id);

            setFormData({
                student_id: String(data.student_id),
                academic_year: data.academic_year,
                semester: String(data.semester),
                total_fee: String(data.total_fee),
                amount_paid: String(data.amount_paid),
                balance: String(data.balance),
                due_date: data.due_date ? new Date(data.due_date).toISOString().split("T")[0] : "",
                payment_status: data.payment_status || "",
                remarks: data.remarks || ""
            });

            setLoading(false);

        };

        load();

    }, [id]);

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

        if (!id) {
            return;
        }

        const data: FeeFormData = {
            student_id: Number(formData.student_id),
            academic_year: formData.academic_year,
            semester: Number(formData.semester),
            total_fee: Number(formData.total_fee),
            amount_paid: Number(formData.amount_paid),
            balance: Number(formData.balance),
            due_date: formData.due_date ? `${formData.due_date}T00:00:00.000Z` : undefined,
            payment_status: formData.payment_status,
            remarks: formData.remarks
        };

        await updateFee(id, data);

        alert("Fee updated successfully");

        navigate("/fee-management");
    };

    if (loading) {
        return <h2 style={{ padding: "30px" }}>Loading...</h2>;
    }

    return (

        <div style={{ padding: "30px", maxWidth: "650px", margin: "0 auto" }}>

            <h1>Edit Fee</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                <input type="number" name="student_id" value={formData.student_id} onChange={handleChange} required />

                <input type="text" name="academic_year" value={formData.academic_year} onChange={handleChange} required />

                <input type="number" name="semester" value={formData.semester} onChange={handleChange} required />

                <input type="number" name="total_fee" value={formData.total_fee} onChange={handleChange} required />

                <input type="number" name="amount_paid" value={formData.amount_paid} onChange={handleChange} required />

                <input type="number" name="balance" value={formData.balance} onChange={handleChange} required />

                <input type="date" name="due_date" value={formData.due_date} onChange={handleChange} />

                <input type="text" name="payment_status" value={formData.payment_status} onChange={handleChange} />

                <input type="text" name="remarks" value={formData.remarks} onChange={handleChange} />

                <button type="submit">
                    Update Fee
                </button>

            </form>

        </div>

    );
};

export default EditFee;