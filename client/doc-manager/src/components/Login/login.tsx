import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useLoginMutation } from "../../redux/services/service";
import { Box, TextField, Typography } from "@mui/material";

interface dataTypes {
    email: string;
    password: string;
}
const data: dataTypes = {
    email: "",
    password: "",
};
const dataSchema = yup.object().shape({
    password: yup.string().required("Password is required*"),
    email: yup
        .string()
        .email("Invalid email address")
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            "Invalid email address"
        )
        .required("Email is required*"),
});

export default function Login() {
    const [Login, { isError, error, isSuccess, data: Data }]: any =
        useLoginMutation();
    const formRef: any = useRef();

    const handelLogin = async (values: any) => {
        Login(values);
    };

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("user", JSON.stringify(Data?.data));
            window.location.replace(process.env.REACT_APP_CLINETURL as any);
        }
    }, [isSuccess]);

    useEffect(() => {
        const handleKeyPress = (event: any) => {
            if (event.key === "Enter") {
                if (formRef.current) {
                    formRef?.current.handleSubmit();
                }
            }
        };
        document.addEventListener("keydown", handleKeyPress);
        return () => {
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, []);

    return (
        <>
            <Formik
                innerRef={formRef}
                initialValues={data}
                validationSchema={dataSchema}
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={(values) => {
                    handelLogin(values).then(r => {});
                }}
            >
                {({
                      values,
                      errors,
                      handleChange,
                      handleSubmit,
                  }) => (
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                className="mx-auto w-[100px] h-[100px] "
                                src="https://cdn-icons-png.freepik.com/512/3237/3237472.png"
                                alt="Your Company"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <Box>
                                    <TextField
                                        id="outlined-basic"
                                        label="Email*"
                                        variant="outlined"
                                        sx={{ width: "400px" }}
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        onChange={handleChange}
                                    />

                                    {errors.email && (
                                        <p className="text-red-700 text-[14px]">{errors.email}</p>
                                    )}
                                </Box>

                                <Box>
                                    <TextField
                                        id="outlined-basic"
                                        label="Password*"
                                        variant="outlined"
                                        sx={{ width: "400px" }}
                                        name="password"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                    />

                                    {errors.password && (
                                        <p className="text-red-700 text-[14px]">
                                            {errors.password}
                                        </p>
                                    )}
                                </Box>

                                <Box>
                                    <Box
                                        onClick={() => {
                                            handleSubmit();
                                        }}
                                        sx={{
                                            background: "black",
                                            color: "white",
                                            py: 1,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: "400px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Typography> Sign in</Typography>
                                    </Box>
                                </Box>
                            </form>

                            {isError && (
                                <p className="text-red-500 text-[13px] mt-2">
                                    {error?.data?.message}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </Formik>
        </>
    );
}
