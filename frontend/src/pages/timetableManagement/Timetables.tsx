import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllTimetables,
    deleteTimetable
} from "../../services/timetableService";

import type { Timetable } from "../../types/timetable";

function Timetables() {

    const [timetables, setTimetables] =
        useState<Timetable[]>([]);

    const [search, setSearch] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const loadTimetables = async () => {

            try {

                const data =
                    await getAllTimetables();

                console.log(
                    "Timetables:",
                    data
                );

                setTimetables(data);

            } catch (error) {

                console.error(
                    "Failed to load timetables:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };

        loadTimetables();

    }, []);

    const filteredTimetables =
        timetables.filter((timetable) => {

            const searchText =
                search.toLowerCase();

            return (
                timetable.day_of_week
                    .toLowerCase()
                    .includes(searchText) ||

                timetable.room_number
                    ?.toLowerCase()
                    .includes(searchText)
            );

        });

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

        const handleDelete = async (id: number) => {
            const confirmed = window.confirm(
                "Are you sure you want to delete this timetable?"
            );

            if (!confirmed) {
                return;
            }

            try {
                await deleteTimetable(String(id));

                alert("Timetable deleted successfully!");

                // Reload timetable list
                const updatedData = await getAllTimetables();

                setTimetables(updatedData);
            } catch (error) {
                console.error(
                    "Failed to delete timetable:",
                    error
                );

                alert("Failed to delete timetable.");
            }
        };

    return (

        <div style={{ padding: "30px" }}>

            <h1>
                Timetable Management
            </h1>

            <p>
                Total Entries:{" "}
                {timetables.length}
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginTop: "20px",
                    alignItems: "center"
                }}
            >

                <input
                    type="text"
                    placeholder="Search timetable..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    style={{
                        padding: "10px",
                        width: "300px",
                        border:
                            "1px solid #ccc",
                        borderRadius: "6px"
                    }}
                />

                <button
                    onClick={() =>
                        navigate(
                            "/timetable-management/add"
                        )
                    }
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding:
                            "10px 20px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontWeight: "bold"
                    }}
                >
                    + Add Timetable
                </button>

            </div>

            {loading ? (

                <p
                    style={{
                        marginTop: "30px"
                    }}
                >
                    Loading timetable...
                </p>

            ) : (

                <table
                    style={{
                        width: "100%",
                        borderCollapse:
                            "collapse",
                        marginTop: "20px",
                        background: "#fff",
                        boxShadow:
                            "0 4px 10px rgba(0,0,0,.1)"
                    }}
                >

                    <thead>

                        <tr
                            style={{
                                background:
                                    "#2563eb",
                                color: "white"
                            }}
                        >

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                ID
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Subject 
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Faculty 
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Department 
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Day
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Start Time
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                End Time
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Room
                            </th>

                            <th
                                style={{
                                    padding: "15px"
                                }}
                            >
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredTimetables.length ===
                        0 ? (

                            <tr>

                                <td
                                    colSpan={9}
                                    style={{
                                        textAlign:
                                            "center",
                                        padding:
                                            "20px"
                                    }}
                                >
                                    No timetable
                                    entries found.
                                </td>

                            </tr>

                        ) : (

                            filteredTimetables.map(
                                (timetable) => (

                                    <tr
                                        key={
                                            timetable
                                                .timetable_id
                                        }
                                    >

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {
                                                timetable
                                                    .timetable_id
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {timetable.subjects?.subject_name || timetable.subject_id}
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {timetable.faculty?.designation || timetable.faculty_id}
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {timetable.departments?.department_name || timetable.department_id}
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {
                                                timetable
                                                    .day_of_week
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {formatTime(timetable.start_time)}
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {formatTime(timetable.end_time)}
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >
                                            {
                                                timetable
                                                    .room_number ||
                                                "-"
                                            }
                                        </td>

                                        <td
                                            style={{
                                                padding:
                                                    "12px",
                                                borderBottom:
                                                    "1px solid #ddd"
                                            }}
                                        >

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/timetable-management/view/${timetable.timetable_id}`
                                                    )
                                                }
                                                style={{
                                                    background:
                                                        "#3b82f6",
                                                    color:
                                                        "white",
                                                    border:
                                                        "none",
                                                    padding:
                                                        "6px 12px",
                                                    borderRadius:
                                                        "6px",
                                                    cursor:
                                                        "pointer",
                                                    marginRight:
                                                        "6px"
                                                }}
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(
                                                        `/timetable-management/edit/${timetable.timetable_id}`
                                                    )
                                                }
                                                style={{
                                                    background:
                                                        "#f59e0b",
                                                    color:
                                                        "white",
                                                    border:
                                                        "none",
                                                    padding:
                                                        "6px 12px",
                                                    borderRadius:
                                                        "6px",
                                                    cursor:
                                                        "pointer",
                                                    marginRight:
                                                        "6px"
                                                }}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(timetable.timetable_id)
                                                }
                                                style={{
                                                    background: "#ef4444",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "6px 12px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </td>

                                    </tr>

                                )
                            )

                        )}

                    </tbody>

                </table>

            )}

        </div>

    );

}

export default Timetables;