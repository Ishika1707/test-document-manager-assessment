import React, { useEffect, useState } from "react";
import {
    useAddFileMutation,
    useDeleteFileMutation,
    useGetUserFilesQuery,
} from "../../redux/services/service";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import {Demo, FileIcon} from "../../constants/constants";

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
    const [dense] = React.useState(false);

    const handleFileUpload = (e: any) => {
        const file: any = Array.from(e.target.files);
        setFiles([...files, file[0]]);
        const formData: any = new FormData();
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
                <div className="flex flex-col items-center justify-center">
                    <p className="text-[30px] font-[400] py-4">List of uploaded files by you</p>
                </div>

                <Box sx={{ flexGrow: 1, width: "600px", mt: 4 }}>
                    <Demo>
                        {data?.data?.filePath?.map((file: any, index: number) => (
                            <List dense={dense} key={file.name+index}>
                                <ListItem
                                    secondaryAction={
                                        <>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() =>
                                                    window.open(
                                                        `http://localhost:5555/${file.url}`,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                <RemoveRedEyeIcon sx={{ color: "#2196f3" }} />
                                            </IconButton>
                                            <IconButton
                                                sx={{ marginLeft: 1 }}
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => handelDelete(file)}
                                            >
                                                <DeleteIcon sx={{ color: "red" }} />
                                            </IconButton>
                                        </>
                                    }
                                >
                                    <ListItemAvatar>
                                        <FileIcon
                                            extension={file?.url
                                                ?.split("uploads/")[1]
                                                .split(".")
                                                .pop()}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText> {file?.url.split("uploads/")[1]}</ListItemText>
                                </ListItem>
                            </List>
                        ))}
                    </Demo>
                </Box>
            </div>
        </div>
    );
};

export default AddFile;
