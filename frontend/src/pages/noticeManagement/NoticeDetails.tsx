/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getNoticeById } from "../../services/noticeService";
import type { Notice } from "../../types/notice";

const NoticeDetails = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [notice, setNotice] = useState<Notice | null>(null);

    useEffect(() => {

        if (!id) {
            return;
        }

        const load = async () => {

            const data = await getNoticeById(id);

            setNotice(data);

        };

        load();

    }, [id]);

    if (!notice) {
        return <h2 style={{ padding: "30px" }}>Loading...</h2>;
    }

    return (

        <div style={{ padding: "30px", maxWidth: "650px", margin: "0 auto" }}>

            <h1>Notice Details</h1>

            <p><strong>Title:</strong> {notice.title}</p>
            <p><strong>Audience:</strong> {notice.target_audience}</p>
            <p><strong>Publish:</strong> {notice.publish_date ? new Date(notice.publish_date).toLocaleDateString("en-IN") : "-"}</p>
            <p><strong>Expiry:</strong> {notice.expiry_date ? new Date(notice.expiry_date).toLocaleDateString("en-IN") : "-"}</p>

            <h3>Content</h3>

            <p>{notice.content}</p>

            <button
                onClick={() =>
                    navigate(`/notice-management/edit/${notice.notice_id}`)
                }
            >
                Edit
            </button>

        </div>

    );

};

export default NoticeDetails;