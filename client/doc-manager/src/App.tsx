import './App.css';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Login from "./components/Login/login";
import Layout from "./components/Layout/layout";
import React from 'react';


function App() {
    const token = JSON.parse(localStorage.getItem("user") || "null");
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    {token ? <Layout /> : <Navigate to="/login" replace />}
                </>
            ),
        },
        {
            path: "/login",
            element: (
                <>
                    <Login />
                </>
            ),
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
