import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent";

function ListContainer() {
  const { topRated, upcoming, popular, nowPlaying } = useSelector(
    (store) => store?.movie
  );
  if (!topRated?.length) return;
  return (
    <div className="bg-black">
      <div className="mt-0 sm:-mt-22 md:-mt-22 lg:-mt-32 xl:-mt-36 ">
        <MovieList title={"Now Playing"} movies={nowPlaying}></MovieList>
        <MovieList title={"Top Rated"} movies={topRated}></MovieList>
        <MovieList title={"Upcoming"} movies={upcoming}></MovieList>
        <MovieList title={"Popular"} movies={popular}></MovieList>
        <ModalComponent />
      </div>
    </div>
  );
}

export default ListContainer;
