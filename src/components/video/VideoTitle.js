import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { movie_poster_base_url, option } from "../../utils/constants";
import { FaPlay } from "react-icons/fa";
import { CiCircleInfo } from "react-icons/ci";
import { Link } from "react-router";
import {
  addMovieDetails,
  addRecommendation,
  setModal,
} from "../../redux/slice/MovieSlice";

function VideoTitle({ itemIndex }) {
  const { topRated } = useSelector((store) => store?.movie);
  const dispatch = useDispatch();
  if (!topRated?.length) return;
  const { original_title, overview, backdrop_path, release_date, id } =
    topRated[itemIndex];
  const showInfo = (movieId) => {
    const urls = [
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1`,
    ];
    Promise.all(urls.map((url) => fetch(url, option).then((r) => r.json())))
      .then((response) => {
        const filteredMovies = response[1]?.results?.filter(
          (movie) => movie.type === "Trailer"
        );
        const videoId = filteredMovies.length ? filteredMovies[0].key : "";
        dispatch(addMovieDetails({ ...response[0], key: videoId }));
        dispatch(addRecommendation(response[2]?.results));
        dispatch(setModal());
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="py-[30%] sm:py-[70%] md:py-[40%] lg:py-[30%] xl:py-60 px-8 text-white absolute bg-gradient-to-t from-black w-screen h-screen">
      <img
        className="hidden w-56 rounded-md"
        alt="movieposter"
        src={movie_poster_base_url + backdrop_path}
      ></img>
      <h1 className="text-sm md:text-lg lg:text-xl xl:text-2xl -mt-10 md:mt-10">
        {original_title}
      </h1>
      <span className="text-xs md:text-sm lg:text-sm xl:text-lg text-center">
        {release_date}
      </span>
      <p className="w-[300px] sm:w-[400px] lg:w-[500px] xl:[600px] text-xs md:text-sm lg:text-sm xl:text-lg line-clamp-2">
        {overview}
      </p>
      <div className="py-3 flex">
        <Link
          to={`/player/${id}`}
          className="flex bg-white h-6 w-14 sm:h-6 sm:w-18 md:h-8 md:w-22 lg:h-10 lg:w-28 xl:h-10 xl:w-28 rounded-md justify-between items-center px-4 sm:px-4 md:px-4 lg:px-8 xl:px-8"
        >
          <FaPlay
            className="hidden sm:block md:block lg:block"
            fill="black"
            size={15}
          />
          <button className=" text-black  text-xs lg:text-sm xl:text-sm md:text-sm">
            Play
          </button>
        </Link>
        <div
          onClick={() => {
            showInfo(id);
          }}
          className="h-6 sm:h-6 md:h-8 lg:h-10 xl:h-10 bg-gray-600 text-white justify-between items-center rounded-md ml-3 flex px-5"
        >
          <CiCircleInfo
            className="hidden sm:block md:block lg:block"
            size={20}
          />
          <button className="ml-2 text-xs">
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VideoTitle;
