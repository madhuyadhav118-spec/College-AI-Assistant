/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getFeeById } from "../../services/feeService";

import type { Fee } from "../../types/fee";

const FeeDetails = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [fee, setFee] = useState<Fee | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!id) {
            return;
        }

        const load = async () => {

            const data = await getFeeById(id);

            setFee(data);

            setLoading(false);

        };

        load();

    }, [id]);

    if (loading) {
        return <h2 style={{ padding: "30px" }}>Loading...</h2>;
    }

    if (!fee) {
        return <h2 style={{ padding: "30px" }}>Fee record not found</h2>;
    }

    return (

        <div style={{ padding: "30px", maxWidth: "650px", margin: "0 auto" }}>

            <h1>Fee Details</h1>

            <p><strong>Fee ID:</strong> {fee.fee_id}</p>
            <p><strong>Student ID:</strong> {fee.student_id}</p>
            <p><strong>Academic Year:</strong> {fee.academic_year}</p>
            <p><strong>Semester:</strong> {fee.semester}</p>
            <p><strong>Total Fee:</strong> ₹{fee.total_fee}</p>
            <p><strong>Amount Paid:</strong> ₹{fee.amount_paid}</p>
            <p><strong>Balance:</strong> ₹{fee.balance}</p>
            <p><strong>Due Date:</strong> {fee.due_date ? new Date(fee.due_date).toLocaleDateString("en-IN") : "-"}</p>
            <p><strong>Status:</strong> {fee.payment_status}</p>
            <p><strong>Remarks:</strong> {fee.remarks || "-"}</p>

            <button
                onClick={() =>
                    navigate(`/fee-management/edit/${fee.fee_id}`)
                }
            >
                Edit
            </button>

        </div>

    );
};

export default FeeDetails;