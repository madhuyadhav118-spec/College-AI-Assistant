/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllFees,
    deleteFee
} from "../../services/feeService";

import type { Fee } from "../../types/fee";

const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};

const formatCurrency = (value: number) => {
    return `₹${Number(value).toLocaleString("en-IN")}`;
};

const Fees = () => {

    const [fees, setFees] = useState<Fee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        let cancelled = false;

        const load = async () => {

            try {

                const data = await getAllFees();

                if (!cancelled) {
                    setFees(data);
                    setLoading(false);
                }

            } catch (err) {

                console.error(err);

                if (!cancelled) {
                    setError("Failed to load fees");
                    setLoading(false);
                }
            }

        };

        load();

        return () => {
            cancelled = true;
        };

    }, []);

    const handleDelete = async (id: string) => {

        if (!window.confirm("Delete this fee record?")) {
            return;
        }

        try {

            await deleteFee(id);

            setFees(previous =>
                previous.filter(
                    fee =>
                        String(fee.fee_id) !== id
                )
            );

            alert("Fee deleted successfully");

        } catch (err) {

            console.error(err);

            alert("Failed to delete fee");
        }
    };

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                Loading...
            </div>
        );
    }

    return (

        <div style={{ padding: "30px" }}>

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "20px"
                }}
            >

                <h1>Fee Management</h1>

                <button
                    onClick={() =>
                        navigate("/fee-management/add")
                    }
                    style={addButton}
                >
                    + Add Fee
                </button>

            </div>

            {error && (
                <p style={{ color: "red" }}>
                    {error}
                </p>
            )}

            <div style={{ overflowX: "auto" }}>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                        <tr style={{ background: "#f3f4f6" }}>

                            <th style={th}>ID</th>
                            <th style={th}>Student</th>
                            <th style={th}>Year</th>
                            <th style={th}>Sem</th>
                            <th style={th}>Total</th>
                            <th style={th}>Paid</th>
                            <th style={th}>Balance</th>
                            <th style={th}>Due Date</th>
                            <th style={th}>Status</th>
                            <th style={th}>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {fees.length === 0 ? (

                            <tr>

                                <td colSpan={10} style={{ padding: "25px", textAlign: "center" }}>
                                    No fee records found.
                                </td>

                            </tr>

                        ) : (

                            fees.map(fee => (

                                <tr key={fee.fee_id}>

                                    <td style={td}>{fee.fee_id}</td>
                                    <td style={td}>{fee.student_id}</td>
                                    <td style={td}>{fee.academic_year}</td>
                                    <td style={td}>{fee.semester}</td>
                                    <td style={td}>{formatCurrency(fee.total_fee)}</td>
                                    <td style={td}>{formatCurrency(fee.amount_paid)}</td>
                                    <td style={td}>{formatCurrency(fee.balance)}</td>
                                    <td style={td}>{formatDate(fee.due_date)}</td>
                                    <td style={td}>{fee.payment_status ?? "-"}</td>

                                    <td style={td}>

                                        <div style={{ display: "flex", gap: "8px" }}>

                                            <button
                                                onClick={() =>
                                                    navigate(`/fee-management/view/${fee.fee_id}`)
                                                }
                                                style={viewButton}
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/fee-management/edit/${fee.fee_id}`)
                                                }
                                                style={editButton}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(String(fee.fee_id))
                                                }
                                                style={deleteButton}
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </div>
    );
};

const th = {
    border: "1px solid #ddd",
    padding: "10px",
    textAlign: "left" as const
};

const td = {
    border: "1px solid #ddd",
    padding: "10px"
};

const addButton = {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer"
};

const viewButton = {
    background: "#16a34a",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

const editButton = {
    background: "#f59e0b",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

const deleteButton = {
    background: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "6px",
    cursor: "pointer"
};

export default Fees;