import React from "react";
import useFetchTopRatedMovies from "../hooks/useFetchTopRatedMovies";
import VideoContainer from "./video/VideoContainer";
import ListContainer from "./movie/ListContainer";
const rndInt = Math.floor(Math.random() * 19) + 1;
function Browse() {
  useFetchTopRatedMovies();

  return (
    <div className="relative  flex flex-col min-h-screen">
      <div className=" w-screen bg-gray relative">
        <VideoContainer itemIndex={rndInt} />
        <div className="absolute -bottom-[600px] bg-gradient-to-t from-black">
          <ListContainer />
        </div>
      </div>
    </div>
  );
}

export default Browse;
