import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "./Login";
import Browse from "./Browse";
import Login from "./Login";

function Body() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default Body;
