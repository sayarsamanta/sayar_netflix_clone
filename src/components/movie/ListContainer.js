import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

function ListContainer() {
  const { topRated, upcoming, popular, nowPlaying } = useSelector(
    (store) => store?.movie
  );
  if (!topRated?.length) return;
  return (
    <div className="w-screen h-screen bg-black sm:bg-black md:bg-black lg:bg-transparent xl:bg-transparent">
      <div className="">
        <MovieList title={"Now Playing"} movies={nowPlaying}></MovieList>
        <div className="bg-black ">
          <MovieList title={"Top Rated"} movies={topRated}></MovieList>
          <MovieList title={"Upcoming"} movies={upcoming}></MovieList>
          <MovieList title={"Popular"} movies={popular}></MovieList>
        </div>
      </div>
    </div>
  );
}

export default ListContainer;
