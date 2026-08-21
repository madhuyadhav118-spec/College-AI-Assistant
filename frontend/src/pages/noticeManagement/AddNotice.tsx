import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addNotice } from "../../services/noticeService";
import type { NoticeFormData } from "../../types/notice";

const AddNotice = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        target_audience: "ALL",
        publish_date: "",
        expiry_date: ""
    });

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

        const data: NoticeFormData = {
            ...formData,
            publish_date: formData.publish_date
                ? `${formData.publish_date}T00:00:00.000Z`
                : undefined,
            expiry_date: formData.expiry_date
                ? `${formData.expiry_date}T00:00:00.000Z`
                : undefined
        };

        await addNotice(data);

        alert("Notice added successfully");

        navigate("/notice-management");

    };

    return (

        <div style={{ padding: "30px", maxWidth: "650px", margin: "0 auto" }}>

            <h1>Add Notice</h1>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />

                <textarea name="content" placeholder="Notice Content" value={formData.content} onChange={handleChange} required rows={5} />

                <select name="target_audience" value={formData.target_audience} onChange={handleChange}>
                    <option value="ALL">ALL</option>
                    <option value="STUDENT">STUDENT</option>
                    <option value="FACULTY">FACULTY</option>
                    <option value="ADMIN">ADMIN</option>
                </select>

                <input type="date" name="publish_date" value={formData.publish_date} onChange={handleChange} />

                <input type="date" name="expiry_date" value={formData.expiry_date} onChange={handleChange} />

                <button type="submit">Add Notice</button>

            </form>

        </div>

    );

};

export default AddNotice;