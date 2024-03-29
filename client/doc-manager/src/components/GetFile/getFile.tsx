import React, {useState} from "react";
import {useGetFileByVersionMutation} from "../../redux/services/service";
import { Box, TextField } from "@mui/material";
import {FileIcon} from "../../constants/constants";

type FormDataType = {
    name: string;
    version: string;
};

type QueryDataType = {
    userId: number;
    name: string;
    version: string;
};

function GetFile() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        version: "",
    });

    const [
        getFileByVersion,
        { isError, error, isSuccess, data: Data },
    ]: any = useGetFileByVersionMutation();

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handelSubmit = (e: any) => {
        e.preventDefault();
        const data: QueryDataType | any = {
            userId: user?.id,
            name: formData.name,
            version: Number(formData.version),
        };
        getFileByVersion(data);
        setFormData({
            name: "",
            version: "",
        });
    };

    return (
        <div>
            <div>
                <p className="text-[30px]  font-[700] py-4 text-center mt-[100px]">
                    Get File By Name and Version
                </p>

                <div
                    className="w-full justify-center mt-4
      gap-4 flex items-center "
                >
                    <TextField
                        id="outlined-basic"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        sx={{ width: "300px" }}
                        label="Name"
                        variant="outlined"
                    />

                    <TextField
                        id="outlined-basic"
                        name="version"
                        type="number"
                        value={formData.version}
                        onChange={handleChange}
                        sx={{ width: "300px" }}
                        label="Version"
                        variant="outlined"
                    />
                    <div>
                        <Box
                            sx={{
                                background: "black",
                                color: "white",
                                px: 3,
                                py: 1,
                                cursor: "pointer",
                            }}
                            onClick={handelSubmit}
                        >
                            Get
                        </Box>
                    </div>
                </div>
            </div>
            {isError == true ? (
                <div className="flex flex-col  items-center justify-center mt-4">
                    <p className="text-red-500">{error?.data?.message}</p>
                </div>
            ) : (
                isSuccess && (
                    <div className="flex flex-col  items-center justify-center mt-4">
                        <div className="w-[30%] h-[400px] hideScrollbar py-4 overflow-y-auto ">
                            <ul>
                                <li className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-3 py-2">
                                        {Data !== undefined && (
                                            <FileIcon
                                                extension={Data?.data?.url
                                                    ?.split("uploads/")[1]
                                                    .split(".")
                                                    .pop()}
                                            />
                                        )}
                                        <p className="text-[13px]">
                                            {" "}
                                            {Data?.data?.url.split("uploads/")[1]}
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
                                                window.open(
                                                    `http://localhost:5555/${Data?.data?.url}`,
                                                    "_blank"
                                                )
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
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default GetFile;
