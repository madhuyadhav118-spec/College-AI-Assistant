
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getExaminationById } from "../../services/examinationService";
import type { Examination } from "../../types/examination";


// Format date
const formatDate = (date: string) => {
    if (!date) {
        return "-";
    }

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};


// Format time
const formatTime = (time: string) => {
    if (!time) {
        return "-";
    }

    return new Date(time).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
};


// Detail row component
interface DetailRowProps {
    label: string;
    value: string;
}


const DetailRow = ({
    label,
    value
}: DetailRowProps) => {

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "180px 1fr",
                padding: "12px 0",
                borderBottom: "1px solid #eeeeee"
            }}
        >
            <strong>
                {label}
            </strong>

            <span>
                {value}
            </span>
        </div>
    );
};


const ExaminationDetails = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();


    const [examination, setExamination] =
        useState<Examination | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    useEffect(() => {

        if (!id) {

            setError(
                "Invalid examination ID."
            );

            setLoading(false);

            return;
        }


        const loadExamination = async () => {

            try {

                const data =
                    await getExaminationById(id);

                setExamination(data);

                setError("");

            } catch (err) {

                console.error(
                    "Failed to load examination:",
                    err
                );

                setError(
                    "Failed to load examination."
                );

            } finally {

                setLoading(false);

            }
        };


        loadExamination();

    }, [id]);


    // Loading
    if (loading) {

        return (
            <div
                style={{
                    padding: "30px"
                }}
            >
                <h2>
                    Loading examination...
                </h2>
            </div>
        );
    }


    // Error
    if (error) {

        return (
            <div
                style={{
                    padding: "30px",
                    maxWidth: "800px",
                    margin: "0 auto"
                }}
            >

                <h1>
                    Examination Details
                </h1>

                <p
                    style={{
                        color: "red",
                        marginTop: "20px"
                    }}
                >
                    {error}
                </p>


                <button
                    onClick={() =>
                        navigate(
                            "/examination-management"
                        )
                    }
                    style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Back
                </button>

            </div>
        );
    }


    // No data
    if (!examination) {

        return (
            <div
                style={{
                    padding: "30px",
                    maxWidth: "800px",
                    margin: "0 auto"
                }}
            >

                <h2>
                    Examination not found
                </h2>


                <button
                    onClick={() =>
                        navigate(
                            "/examination-management"
                        )
                    }
                    style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Back
                </button>

            </div>
        );
    }


    // Main page
    return (

        <div
            style={{
                padding: "30px",
                maxWidth: "800px",
                margin: "0 auto"
            }}
        >

            {/* Header */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "25px"
                }}
            >

                <h1
                    style={{
                        margin: 0
                    }}
                >
                    Examination Details
                </h1>


                <button
                    onClick={() =>
                        navigate(
                            "/examination-management"
                        )
                    }
                    style={{
                        background: "#6b7280",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Back
                </button>

            </div>


            {/* Examination Details Card */}

            <div
                style={{
                    background: "white",
                    border: "1px solid #dddddd",
                    borderRadius: "8px",
                    padding: "25px"
                }}
            >

                <DetailRow
                    label="Examination ID"
                    value={
                        String(
                            examination.exam_id
                        )
                    }
                />


                <DetailRow
                    label="Exam Name"
                    value={
                        examination.exam_name
                    }
                />


                <DetailRow
                    label="Subject ID"
                    value={
                        String(
                            examination.subject_id
                        )
                    }
                />


                <DetailRow
                    label="Exam Type"
                    value={
                        examination.exam_type
                    }
                />


                <DetailRow
                    label="Exam Date"
                    value={
                        formatDate(
                            examination.exam_date
                        )
                    }
                />


                <DetailRow
                    label="Start Time"
                    value={
                        formatTime(
                            examination.start_time
                        )
                    }
                />


                <DetailRow
                    label="End Time"
                    value={
                        formatTime(
                            examination.end_time
                        )
                    }
                />


                <DetailRow
                    label="Venue"
                    value={
                        examination.venue ||
                        "-"
                    }
                />


                <DetailRow
                    label="Total Marks"
                    value={
                        String(
                            examination.total_marks ??
                            100
                        )
                    }
                />

            </div>


            {/* Edit Button */}

            <div
                style={{
                    marginTop: "20px"
                }}
            >

                <button
                    onClick={() =>
                        navigate(
                            `/examination-management/edit/${examination.exam_id}`
                        )
                    }
                    style={{
                        background: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Edit
                </button>

            </div>

        </div>
    );
};


export default ExaminationDetails;
