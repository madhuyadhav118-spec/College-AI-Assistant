import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTimetableById } from "../../services/timetableService";
import type { Timetable } from "../../types/timetable";

const TimetableDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [timetable, setTimetable] =
        useState<Timetable | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        const loadTimetable = async () => {
            try {
                if (!id) {
                    return;
                }

                const data =
                    await getTimetableById(id);

                setTimetable(data);
            } catch (error) {
                console.error(
                    "Failed to load timetable:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        loadTimetable();
    }, [id]);

    if (loading) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Loading timetable...</h2>
            </div>
        );
    }

    if (!timetable) {
        return (
            <div style={{ padding: "30px" }}>
                <h2>Timetable not found</h2>

                <button
                    onClick={() =>
                        navigate(
                            "/timetable-management"
                        )
                    }
                >
                    Back
                </button>
            </div>
        );
    }

    const formatTime = (time: string) => {
        if (!time) {
            return "-";
        }

        const date = new Date(time);

        return date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div style={{ padding: "30px" }}>
            <h1>Timetable Details</h1>

            <div style={{ marginTop: "25px" }}>
                <p>
                    <strong>Timetable ID:</strong>{" "}
                    {timetable.timetable_id}
                </p>

                <p>
                    <strong>Subject:</strong>{" "}
                    {timetable.subjects?.subject_name ||
                        timetable.subject_id}
                </p>

                <p>
                    <strong>Faculty:</strong>{" "}
                    {timetable.faculty?.designation ||
                        timetable.faculty_id}
                </p>

                <p>
                    <strong>Department:</strong>{" "}
                    {timetable.departments?.department_name ||
                        timetable.department_id}
                </p>

                <p>
                    <strong>Day:</strong>{" "}
                    {timetable.day_of_week}
                </p>

                <p>
                    <strong>Start Time:</strong>{" "}
                    {formatTime(
                        timetable.start_time
                    )}
                </p>

                <p>
                    <strong>End Time:</strong>{" "}
                    {formatTime(
                        timetable.end_time
                    )}
                </p>

                <p>
                    <strong>Room:</strong>{" "}
                    {timetable.room_number || "-"}
                </p>
            </div>

            <button
                onClick={() =>
                    navigate(
                        "/timetable-management"
                    )
                }
                style={{
                    marginTop: "20px",
                    padding: "10px 20px"
                }}
            >
                Back
            </button>
        </div>
    );
};

export default TimetableDetails;