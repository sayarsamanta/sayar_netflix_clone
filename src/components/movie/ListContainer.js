import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

function ListContainer() {
  const { topRated, upcoming, popular, nowPlaying } = useSelector(
    (store) => store?.movie
  );
  if (!topRated?.length) return;
  return (
    <div className="w-screen bg-black">
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
