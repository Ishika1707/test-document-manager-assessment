import React, { useEffect, useState } from "react";
import {
    useAddFileMutation,
    useDeleteFileMutation,
    useGetUserFilesQuery,
} from "../../redux/services/service";
import FileIcon from "../../constants/constants";
import GetFile from "../GetFile/getFile";

const AddFile = () => {
    const [addFile, { isSuccess }] : any = useAddFileMutation();

    const [deleteFile, {isSuccess: del_isSuccess}] : any = useDeleteFileMutation();

    const user = JSON.parse(localStorage.getItem("user") || "null");

    const userId: any = user?.id;

    const {data, refetch} : any = useGetUserFilesQuery(userId);

    useEffect(() => {
        if (isSuccess) {
            refetch(userId);
        }
    }, [isSuccess]);

    const [files, setFiles] = useState<any>([]);

    const handleFileUpload = (e: any) => {
        const file: any = Array.from(e.target.files);
        setFiles([...files, file[0]]);
        const formData = new FormData();
        formData.append("userId", user?.id);
        formData.append("file", file[0]);
        addFile(formData);
        e.target.value = null;
    };
    const handelDelete = (file: any) => {
        const data = {
            userId: user?.id,
            version: file?.version,
            name: file?.name,
        };
        deleteFile(data);
    };

    useEffect(() => {
        if (del_isSuccess) {
            refetch(userId);
        }
    }, [del_isSuccess]);

    return (
        <div className="">
            <div className="flex flex-col  items-center justify-center">
                <div className="bg-[#D9D9D9] w-[643px] h-[50px] my-6 flex items-center justify-between">
                    <p className="px-4 text-[14px]">Upload a file</p>

                    <div className="relative cursor-pointer">
                        <div className="w-[120px] h-[48px] bg-black"></div>
                        <div className="absolute top-0 cursor-pointer  text-[14px] text-white py-4 px-4">
                            <label className=" cursor-pointer "> Browse</label>
                            <input
                                type="file"
                                name="files"
                                accept=".pdf, .docx, .xlsx, image/*"
                                onChange={handleFileUpload}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
                <GetFile/>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[30px] font-[400] py-4">List of uploaded files by you</p>
                </div>

                <div className="w-[50%] h-[400px] hideScrollbar py-4 overflow-y-auto">
                    <ul>
                        {data?.data?.filePath?.map((file: any, index: number) => (
                            <li
                                className="flex items-center justify-between gap-2"
                                key={index}
                            >
                                <div className="flex items-center gap-3 py-2">
                                    <FileIcon
                                        extension={file?.url?.split("uploads/")[1].split(".").pop()}
                                    />
                                    <p className="text-[13px]">
                                        {" "}
                                        {file?.url.split("uploads/")[1]}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 text-gray-400 cursor-pointer"
                                        onClick={() =>
                                            window.open(`http://localhost:5555/${file.url}`, "_blank")
                                        }
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5 text-red-600 cursor-pointer"
                                        onClick={() => handelDelete(file)}
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AddFile;
