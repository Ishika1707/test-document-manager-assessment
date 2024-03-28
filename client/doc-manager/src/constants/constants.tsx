import {FaFile, FaFileExcel, FaFileImage, FaFilePdf, FaFileWord} from "react-icons/fa";
import React from "react";

const FileIcon = ({ extension, size = 30 }: any) => {
    const mapExtensionToIcon: any = {
        pdf: { icon: <FaFilePdf size={size} />, color: "red" },
        doc: { icon: <FaFileWord size={size} />, color: "blue" },
        docx: { icon: <FaFileWord size={size} />, color: "blue" },
        xls: { icon: <FaFileExcel size={size} />, color: "green" },
        xlsx: { icon: <FaFileExcel size={size} />, color: "green" },
        jpg: { icon: <FaFileImage size={size} />, color: "orange" },
        jpeg: { icon: <FaFileImage size={size} />, color: "orange" },
        png: { icon: <FaFileImage size={size} />, color: "orange" },
    };

    const defaultIcon = { icon: <FaFile size={size} />, color: "black" };
    const { icon, color } =
    mapExtensionToIcon[extension.toLowerCase()] || defaultIcon;

    return (
        <span style={{ color, display: "flex", alignItems: "center" }}>
        {icon}
      </span>
    );
};

export default FileIcon;
