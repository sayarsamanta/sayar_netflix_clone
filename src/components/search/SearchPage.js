import React, { useRef } from "react";
import { option } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedMovies } from "../../redux/slice/SearchSlice";
import MovieCard from "../movie/MovieCard";

function SearchPage() {
  const searchRef = useRef();
  const dispatch = useDispatch();
  const { searchedMovies } = useSelector((store) => store?.search);
  const handleApi = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchRef.current.value}&include_adult=false&language=en-US&page=1`,
      option
    );
    const json = await data.json();
    if (json?.results?.length) {
      dispatch(setSearchedMovies(json?.results));
    }
  };

  function debounce(callback, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback();
      }, delay);
    };
  }
  return (
    <div className="flex h-screen bg-black justify-center items-center">
      <div>
        {/* <img
          className="hidden absolute sm:hidden md:block lg:block xl:block h-screen w-screen object-fill"
          alt="background logo"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fb5cb900-0cb6-4728-beb5-579b9af98fdd/web/IN-en-20250127-TRIFECTA-perspective_cf66f5a3-d894-4185-9106-5f45502fc387_large.jpg"
        ></img> */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex absolute z-40 w-[60%] md:w-[60%] sm:w-[60%] lg:w-[60%] xl:w-[60%] bg-black mx-auto right-0 left-0 top-0  bg-opacity-80 my-28 rounded-lg p-10 items-center self-center"
        >
          <input
            ref={searchRef}
            onChange={debounce(handleApi, 1000)}
            className="h-12 w-[70%] rounded-tl-md rounded-bl-md text=black p-5 outline-none self-center text-xs sm:text-xs md:text-lg lg:text-lg xl:text-lg"
            placeholder="Search movie here....."
          ></input>
          <button
            onClick={() => {
              handleApi();
            }}
            className="h-12 w-[30%] rounded-tr-md rounded-br-md bg-red-600 text-white text-xs sm:text-xs md:text-lg lg:text-lg xl:text-lg"
          >
            Search
          </button>
        </form>
        {searchedMovies?.length ? (
          <div className=" bg-black flex flex-wrap w-screen justify-center items-center self-center pt-[50%] pb-10">
            {searchedMovies?.map((movie) => (
              <MovieCard key={movie?.id} movie={movie} />
            ))}
            {/* <MovieList title={"Searched Movies"} movies={searchedMovies} /> */}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SearchPage;
