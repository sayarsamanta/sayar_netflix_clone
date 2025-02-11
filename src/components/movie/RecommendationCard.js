import React, { useState } from "react";
import { movie_poster_base_url } from "../../utils/constants";
import { BsBadgeHd } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
import { setModal } from "../../redux/slice/MovieSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { addFavorites } from "../../redux/slice/FavoriteSlice";
import { CiCircleCheck } from "react-icons/ci";
function RecommendationCard({ movie }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movieItem, setMovieItem] = useState(movie);
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
  const { id, backdrop_path, release_date, overview } = movieItem;
  return (
    <div
      className=" relative h-auto mr-5 mt-10 rounded-md bg-myColor w-auto"
      key={id}
    >
      <img
        alt="recommendation"
        className="w-auto h-auto rounded-bl-none rounded-br-none rounded-md"
        src={movie_poster_base_url + backdrop_path}
      ></img>
      <div
        onClick={() => {
          dispatch(setModal());
          navigate(`/player/${id}`);
        }}
        className="cursor-pointer absolute z-30 rounded-full border-[0.5px] w-6 h-6 border-color top-10 left-[45%] items-center flex justify-center"
      >
        <IoPlay fill="white" size={15} />
      </div>
      <div className="flex items-center px-5 py-5 text-white justify-between">
        <div className="flex items-center">
          <div className="text-white border-[0.5px] md:w-14 lg:w-14 xl:w-14 sm:w-14 justify-center items-center h-6 flex border-white">
            <p className="text-[10px] px-1 text-textColor/100">{"U/A 16+"}</p>
          </div>
          <BsBadgeHd className="ml-2" size={20} fill="#939393" />
          <span className="hidden text-xs text-textColor/100 ml-2">
            {release_date.split("-")[0]}
          </span>
        </div>
        {movieItem?.isFavorite ? (
          <CiCircleCheck className="cursor-pointer" size={30} fill="#939393" />
        ) : (
          <IoIosAddCircleOutline
            className="cursor-pointer"
            onClick={() => {
              addToWatchList(id);
            }}
            size={30}
            fill="#939393"
          />
        )}
      </div>
      <div className="px-5 py-2">
        {/* <h1>{original_title}</h1> */}
        <p className="line-clamp-5 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm text-textColor text-ellipsis">
          {overview}
        </p>
      </div>
    </div>
  );
}

export default RecommendationCard;
