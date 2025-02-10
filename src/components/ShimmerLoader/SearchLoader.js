import React from "react";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { ScaleLoader } from "react-spinners";

function SearchLoader() {
  return (
    <>
      <div className="hidden sm:flex md:flex lg:flex xl:flex flex-wrap overflow-x-scroll fixed justify-center items-center">
        {[
          ...Array.from({ length: 10 }).map((i) => {
            return (
              <ShimmerThumbnail
                className={"mr-3"}
                height={200}
                width={200}
                rounded
              />
            );
          }),
        ]}
      </div>
      <div className="flex sm:hidden md:hidden lg:hidden xl:hidden h-screen w-screen justify-center mt-10">
        <ScaleLoader color="white" />
      </div>
    </>
  );
}

export default SearchLoader;
