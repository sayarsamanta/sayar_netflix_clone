import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Home from "./Home";
import Browse from "./Browse";

function Body() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);
  return <RouterProvider router={routes}></RouterProvider>;
}

export default Body;
