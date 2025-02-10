import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "./movie/MovieCard";
function Favorites() {
  const { favorites } = useSelector((store) => store?.favorite);

  return (
    <div className="bg-black h-screen text-black justify-center items-center pt-20">
      <h1 className="text-white px-10">Favorited Movies</h1>
      {favorites?.length ? (
        <div className=" bg-black flex flex-wrap w-screen justify-center items-center self-center">
          {favorites?.map((movie) => (
            <MovieCard key={movie?.id} movie={movie} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default Favorites;
