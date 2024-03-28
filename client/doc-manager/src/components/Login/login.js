import React, { useEffect, useRef } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import {useLoginMutation} from "../../redux/services/service";

const data = {
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
    const [Login, { isError, error, isSuccess, data: Data }] =
        useLoginMutation();

    const formRef = useRef();
    const handelLogin = async (values) => {
        Login(values);
    };

    useEffect(() => {
        if (isSuccess) {
            localStorage.setItem("user", JSON.stringify(Data?.data));
            window.location.replace(process.env.REACT_APP_CLINETURL);
        }
    }, [isSuccess, Data]);

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
                      isSubmitting,
                      resetForm,
                  }) => (
                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                            <h2>
                                Sign in to your account
                            </h2>

                        <div>
                            <form action="#" method="POST">
                                <div>
                                    <label
                                        htmlFor="email"
                                    >
                                        Email address
                                    </label>
                                    <div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            />
                                    </div>
                                    {errors.email && (
                                        <p>{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Password
                                        </label>
                                        <div>
                                            <a
                                                href="#"
                                            >
                                                Forgot password?
                                            </a>
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            autoComplete="current-password"
                                            value={values.password}
                                            onChange={handleChange}
                                            />
                                    </div>
                                    {errors.password && (
                                        <p>
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div
                                        onClick={(e) => {
                                            handleSubmit();
                                        }}
                                        >
                                        Sign in
                                    </div>
                                </div>
                            </form>

                            {isError && (
                                <p>
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
