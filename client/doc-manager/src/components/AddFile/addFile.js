import React, { useState } from "react";
import "./addFile.css"
import {useAddFileMutation} from "../../redux/services/service";

const AddFile = () => {

    const [addFile] =
        useAddFileMutation();

    const [files, setFiles] = useState([]);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    function handleFileUpload(e) {
        const file= Array.from(e.target.files);
        setFiles([...files, file[0]]);
        const formData = new FormData();
        formData.append("userId", user?.id);
        formData.append("file", file[0]);
        addFile(formData);
    }

    return (
        <div style={{display: "flex"}}>
            <label>Select files from drive files</label>
                    <input
                        type="file"
                        name="files"
                        title=""
                        accept=".pdf, .docx, .xlsx, image/*"
                        onChange={handleFileUpload}
                        />
        </div>
    );
};

export default AddFile;
