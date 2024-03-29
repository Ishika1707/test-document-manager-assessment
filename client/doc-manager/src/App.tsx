import './App.css';
import {
    createBrowserRouter,
    Navigate,
    RouterProvider,
} from "react-router-dom";
import Login from "./components/Login/login";
import React from 'react';
import Burger from "./components/Layout/burger";


function App() {
    const token = JSON.parse(localStorage.getItem("user") || "null");
    const router = createBrowserRouter([
        {
            path: "/",
            element: (
                <>
                    {token ? <Burger /> : <Navigate to="/login" replace />}
                </>
            ),
        },
        {
            path: "/file",
            element: (
                <>
                    {token ? <Burger /> : <Navigate to="/login" replace />}
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
