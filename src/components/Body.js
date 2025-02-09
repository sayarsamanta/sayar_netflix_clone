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
import Favorites from "./Favorites";
import Rootlayout from "./Rootlayout";
import SearchPage from "./search/SearchPage";
import Player from "./player/Player";

function Body() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Rootlayout />}>
        {/* All other routes that you want to protect will go inside here */}
        {/* <Route element={<PrivateRoutes />}> */}
        <Route path="browse" element={<Browse />}></Route>
        <Route path="favorites" element={<Favorites />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="player" element={<Player />} />

        {/* </Route> */}
        <Route index element={<Login />} />
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default Body;
