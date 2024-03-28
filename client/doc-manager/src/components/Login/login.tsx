import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useLoginMutation } from "../../redux/services/service";

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
    }, [isSuccess, Data]);

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
                      handleSubmit
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
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        Email address
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-red-700 text-[14px]">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <div className="text-sm">
                                            <a
                                                href="#"
                                                className="font-semibold text-indigo-900 hover:text-indigo-900"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            value={values.password}
                                            onChange={handleChange}
                                            className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-700 text-[14px]">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div
                                        onClick={(e) => {
                                            handleSubmit();
                                        }}
                                        className="flex cursor-pointer w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        Sign in
                                    </div>
                                </div>
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
