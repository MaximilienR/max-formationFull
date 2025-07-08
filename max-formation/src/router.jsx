import React from "react";
import { createBrowserRouter } from "react-router-dom";
import APP from "./App";
import "./index.css";
import Error from "./pages/Error";
import Home from "./components/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <APP />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profil",
        element: "/",
      },
    ],
  },
]);
