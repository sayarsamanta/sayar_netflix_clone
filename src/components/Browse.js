import React from "react";
import Header from "./Header";
import useFetchTopRatedMovies from "../hooks/useFetchTopRatedMovies";
import VideoContainer from "./video/VideoContainer";
import ListContainer from "./movie/ListContainer";
const rndInt = Math.floor(Math.random() * 19) + 1;
function Browse() {
  useFetchTopRatedMovies();
  // useFetchUpcomingMovies();
  // usePopularMovies();
  // useNowPlaying();

  return (
    <div className=" bg-black flex flex-col min-h-screen">
      <div className="">
        <VideoContainer itemIndex={rndInt} />
      </div>

      <ListContainer />
    </div>
  );
}

export default Browse;
