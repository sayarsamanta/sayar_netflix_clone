import React from "react";
import { movie_poster_base_url } from "../../utils/constants";
import { BsBadgeHd } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
function RecommendationCard({ movie }) {
  if (!movie?.backdrop_path) return;
  return (
    <div
      className="h-auto mr-5 mt-10 rounded-md bg-myColor w-auto"
      key={movie?.id}
    >
      <img
        alt="recommendation"
        className="w-auto h-auto rounded-bl-none rounded-br-none rounded-md"
        src={movie_poster_base_url + movie?.backdrop_path}
      ></img>
      <div className="flex items-center px-5 py-5 text-white justify-between">
        <div className="flex items-center">
          <div className="text-white border-[0.5px] md:w-14 lg:w-14 xl:w-14 sm:w-14 justify-center items-center h-6 flex border-white">
            <p className="text-[10px] px-1 text-textColor/100">{"U/A 16+"}</p>
          </div>
          <BsBadgeHd className="ml-2" size={20} fill="#939393" />
          <span className="hidden text-xs text-textColor/100 ml-2">
            {movie?.release_date.split("-")[0]}
          </span>
        </div>

        <IoIosAddCircleOutline size={30} fill="#939393" />
      </div>
      <div className="px-5 py-2">
        {/* <h1>{movie?.original_title}</h1> */}
        <p className="line-clamp-5 text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm text-textColor text-ellipsis">
          {movie?.overview}
        </p>
      </div>
    </div>
  );
}

export default RecommendationCard;
