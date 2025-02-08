import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";

function Rootlayout() {
  return (
    <div>
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <Outlet />
    </div>
  );
}

export default Rootlayout;
