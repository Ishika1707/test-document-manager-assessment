import React, { useState } from "react";
import { useGetFileByVersionMutation } from "../../redux/services/service";
import FileIcon from "../../constants/constants";

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

    const data: QueryDataType | any = {
        userId: user?.id,
        name: formData.name,
        version: formData.version,
    };

    const [
        getFileByVersion,
        { isError, isLoading, error, isSuccess, data: Data },
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
            <div className="py-0 mb-20">
                <p className="text-[30px]  font-[400] py-4 text-center mt-[100px]">
                    Get A File By Name and Version
                </p>

                <div
                    className="w-full justify-center mt-4
      gap-4 flex items-center "
                >
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="w-[300px] px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <label
                            htmlFor="version"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Version
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="version"
                                id="version"
                                className=" w-[300px] px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="version"
                                value={formData.version}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={handelSubmit}
                            className="inline-flex items-center mt-8 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Fetch
                        </button>
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
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="w-5 h-5 text-red-600 cursor-pointer"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                                                clipRule="evenodd"
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
