/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllNotices,
    deleteNotice
} from "../../services/noticeService";

import type { Notice } from "../../types/notice";

const formatDate = (date?: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
};

const Notices = () => {

    const navigate = useNavigate();

    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        let cancelled = false;

        const load = async () => {

            try {

                const data = await getAllNotices();

                if (!cancelled) {
                    setNotices(data);
                    setLoading(false);
                }

            } catch (err) {

                console.error(err);

                if (!cancelled) {
                    setError("Failed to load notices");
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

        if (!window.confirm("Delete this notice?")) {
            return;
        }

        try {

            await deleteNotice(id);

            setNotices(previous =>
                previous.filter(
                    notice =>
                        String(notice.notice_id) !== id
                )
            );

            alert("Notice deleted successfully");

        } catch (err) {

            console.error(err);

            alert("Failed to delete notice");

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
                    alignItems: "center",
                    marginBottom: "20px"
                }}
            >

                <h1>Notice Management</h1>

                <button
                    onClick={() =>
                        navigate("/notice-management/add")
                    }
                    style={addButton}
                >
                    + Add Notice
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
                            <th style={th}>Title</th>
                            <th style={th}>Audience</th>
                            <th style={th}>Publish</th>
                            <th style={th}>Expiry</th>
                            <th style={th}>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {notices.length === 0 ? (

                            <tr>

                                <td colSpan={6} style={{ padding: "25px", textAlign: "center" }}>
                                    No notices found.
                                </td>

                            </tr>

                        ) : (

                            notices.map(notice => (

                                <tr key={notice.notice_id}>

                                    <td style={td}>{notice.notice_id}</td>

                                    <td style={td}>{notice.title}</td>

                                    <td style={td}>{notice.target_audience}</td>

                                    <td style={td}>{formatDate(notice.publish_date)}</td>

                                    <td style={td}>{formatDate(notice.expiry_date)}</td>

                                    <td style={td}>

                                        <div style={{ display: "flex", gap: "8px" }}>

                                            <button
                                                onClick={() =>
                                                    navigate(`/notice-management/view/${notice.notice_id}`)
                                                }
                                                style={viewButton}
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/notice-management/edit/${notice.notice_id}`)
                                                }
                                                style={editButton}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    handleDelete(String(notice.notice_id))
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

export default Notices;