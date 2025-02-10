import React from "react";
import useFetchTopRatedMovies from "../hooks/useFetchTopRatedMovies";
import VideoContainer from "./video/VideoContainer";
import ListContainer from "./movie/ListContainer";
import BrowseLoader from "./ShimmerLoader/BrowseLoader";

const rndInt = Math.floor(Math.random() * 19) + 1;
function Browse() {
  const loading = useFetchTopRatedMovies();

  return (
    <div className="relative  flex flex-col min-h-screen">
      <div className=" w-screen bg-gray relative">
        {loading ? (
          <div className="flex w-screen h-screen bg-black justify-center items-center">
            <BrowseLoader />
          </div>
        ) : (
          <>
            <VideoContainer itemIndex={rndInt} />
            <div className="absolute -bottom-[600px] bg-gradient-to-t from-black">
              <ListContainer />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Browse;
