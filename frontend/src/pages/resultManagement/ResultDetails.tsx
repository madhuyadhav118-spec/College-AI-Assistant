/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getResultById } from "../../services/resultService";

import type { Result } from "../../types/result";

const ResultDetails = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [result, setResult] = useState<Result | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!id) {
            return;
        }

        const load = async () => {

            try {

                const data = await getResultById(id);

                setResult(data);

            } finally {

                setLoading(false);
            }
        };

        load();

    }, [id]);

    if (loading) {
        return <h2 style={{ padding: "30px" }}>Loading...</h2>;
    }

    if (!result) {
        return <h2 style={{ padding: "30px" }}>Result not found</h2>;
    }

    return (

        <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>

            <h1>Result Details</h1>

            <p><strong>ID:</strong> {result.result_id}</p>
            <p><strong>Student ID:</strong> {result.student_id}</p>
            <p><strong>Exam ID:</strong> {result.exam_id}</p>
            <p><strong>Marks:</strong> {result.marks_obtained}</p>
            <p><strong>Grade:</strong> {result.grade}</p>

            <button
                onClick={() =>
                    navigate(`/result-management/edit/${result.result_id}`)
                }
            >
                Edit
            </button>

        </div>
    );
};

export default ResultDetails;