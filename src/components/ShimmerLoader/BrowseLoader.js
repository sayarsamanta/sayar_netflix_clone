import React from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ScaleLoader } from "react-spinners";

function BrowseLoader() {
  return (
    <>
      <div className="flex sm:hidden md:hidden lg:hidden xl:hidden justify-center items-center  self-center">
        <ScaleLoader color="white" />
      </div>
      <div className="hidden sm:flex md:flex lg:flex xl:flex h-screen w-screen bg-black fixed">
        <div className="w-screen h-screen justify-center items-start self-start px-10 pt-24">
          <ShimmerThumbnail height={500} width={"100%"} rounded />
          <div className="flex overflow-x-scroll">
            {[
              ...Array.from({ length: 10 }).map((i) => {
                return (
                  <ShimmerThumbnail
                    className={"mr-3"}
                    height={200}
                    width={250}
                    rounded
                  />
                );
              }),
            ]}
          </div>
        </div>
      </div>
    </>
  );
}

export default BrowseLoader;
