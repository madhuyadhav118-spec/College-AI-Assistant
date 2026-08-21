/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getNoticeById,
    updateNotice
} from "../../services/noticeService";

import type { NoticeFormData } from "../../types/notice";

const EditNotice = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        target_audience: "",
        publish_date: "",
        expiry_date: ""
    });

    useEffect(() => {

        if (!id) {
            return;
        }

        const load = async () => {

            const data = await getNoticeById(id);

            setFormData({
                title: data.title,
                content: data.content,
                target_audience: data.target_audience,
                publish_date: data.publish_date ? new Date(data.publish_date).toISOString().split("T")[0] : "",
                expiry_date: data.expiry_date ? new Date(data.expiry_date).toISOString().split("T")[0] : ""
            });

        };

        load();

    }, [id]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

        const data: NoticeFormData = {
            ...formData,
            publish_date: formData.publish_date ? `${formData.publish_date}T00:00:00.000Z` : undefined,
            expiry_date: formData.expiry_date ? `${formData.expiry_date}T00:00:00.000Z` : undefined
        };

        await updateNotice(id, data);

        alert("Notice updated successfully");

        navigate("/notice-management");

    };

    return (

        <div style={{ padding: "30px", maxWidth: "650px", margin: "0 auto" }}>

            <h1>Edit Notice</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                <input type="text" name="title" value={formData.title} onChange={handleChange} required />

                <textarea name="content" value={formData.content} onChange={handleChange} rows={5} required />

                <select name="target_audience" value={formData.target_audience} onChange={handleChange}>
                    <option value="ALL">ALL</option>
                    <option value="STUDENT">STUDENT</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <input type="date" name="publish_date" value={formData.publish_date} onChange={handleChange} />

                <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} />

                <button type="submit">
                    Update Notice
                </button>

            </form>

        </div>

    );

};

export default EditNotice;