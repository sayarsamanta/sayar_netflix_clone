import React from "react";
import { movie_poster_base_url } from "../../utils/constants";
import { BsBadgeHd } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
function RecommendationCard({ movie }) {
  if (!movie?.backdrop_path) return;
  return (
    <div
      className="overflow-clip h-[400px] mr-3 mt-10 rounded-md bg-myColor w-[250px]"
      key={movie?.id}
    >
      <img
        alt="recommendation"
        className="w-[250px] h-[150px]"
        src={movie_poster_base_url + movie?.backdrop_path}
      ></img>
      <div className="flex items-center px-5 py-5 text-white justify-between">
        <div className="flex items-center">
          <div className="text-white border-[0.5px] w-14 justify-center items-center h-6 flex border-white">
            <p className="text-xs text-textColor/100">{"U/A 16+"}</p>
          </div>
          <BsBadgeHd className="ml-2" size={25} fill="#939393" />
          <span className="text-xs text-textColor/100 ml-2">
            {movie?.release_date.split("-")[0]}
          </span>
        </div>

        <IoIosAddCircleOutline size={40} fill="#939393" />
      </div>
      <div className="px-5 py-2">
        {/* <h1>{movie?.original_title}</h1> */}
        <p className="line-clamp-5 text-sm text-textColor">{movie?.overview}</p>
      </div>
    </div>
  );
}

export default RecommendationCard;
