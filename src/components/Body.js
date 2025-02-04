import React from "react";
import { RouterProvider } from "react-router";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import PageNotFound from "./PageNotFound";
import PrivateRoutes from "../PrivateRoutes";

function Body() {
  // const routes = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/browse",
  //     element: <Browse />,
  //   },
  // ]);
  //console.log("from body", JSON.parse(localStorage.getItem("data")));
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/* All other routes that you want to protect will go inside here */}
        <Route element={<PrivateRoutes />}>
          <Route path="browse" element={<Browse />} />
        </Route>
        <Route index element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default Body;
