import React, { useState } from "react";
import { movie_poster_base_url, option } from "../../utils/constants";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { IoPlay } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addFavorites } from "../../redux/slice/FavoriteSlice";
import {
  addMovieDetails,
  addRecommendation,
  setModal,
} from "../../redux/slice/MovieSlice";
function MovieCard({ movie }) {
  const dispatch = useDispatch();
  const [movieItem, setMovieItem] = useState(movie);
  const fetchMovieDetail = async (id) => {
    const urls = [
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`,
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
  const addToWatchList = async (id) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization: process.env.REACT_APP_TMDB_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: id,
        watchlist: true,
      }),
    };
    const data = await fetch(
      `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/watchlist`,
      options
    );
    const json = await data.json();
    if (json.success) {
      setMovieItem({ ...movieItem, isFavorite: true });
      dispatch(addFavorites({ ...movieItem, isFavorite: true }));
    }
  };
  if (!movie?.backdrop_path) return;
  const { id, isFavorite = false, backdrop_path } = movieItem;
  return (
    <div
      id={id}
      key={id}
      className="relative w-36 sm:w-44 md:w-52 lg:w-56 xl:w-[300px] mr-3 group shadow-lg mt-2 cursor-pointer"
    >
      <div className="relative overflow-hidden">
        <img
          id={id}
          className="rounded-lg object-cover"
          alt="each movie"
          src={movie_poster_base_url + backdrop_path}
        ></img>
        <div
          onClick={() => {
            fetchMovieDetail(id);
          }}
          className="rounded-full border-[0.5px] w-6 h-6 border-color absolute top-[45%] left-[45%] items-center flex justify-center"
        >
          <IoPlay fill="white" size={15} />
        </div>

        {/* <div class="absolute h-full w-full bg-white/20 flex items-center justify-center -bottom-10 group-hover:scale-x-[2px] group-hover:bottom-0 opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden">
          <div className="text-xs h-full text-white bg-gradient-to-bl from-black py-2 px-4 overflow-y-scroll">
            <h2 className="font-semibold text-sm">{original_title}</h2>
            <h4 className="text-xs">{release_date}</h4>
            <div className="mt-2">{overview}</div>
          </div>
        </div> */}
        <div
          id={id}
          className="block absolute top-[4px] right-2 sm:top-[5px] sm:right-2 md:top-[5px] md:right-2 lg:top-[7px] lg:right-3 xl:top-[7px] xl:right-5 self-end cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            addToWatchList(id);
          }}
        >
          {isFavorite ? (
            <MdFavorite fill="white" />
          ) : (
            <MdFavoriteBorder fill="white" />
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
