import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ title, movies }) {
  return (
    <div className="mx-5 rounded-md">
      <div className="p-3">
        <h1 className="text-white text-sm md:text-lg lg:text-xl xl:text-xl font-semibold">
          {title}
        </h1>

        <div className="flex overflow-x-scroll">
          <div
            id="parent"
            className="flex cursor-pointer "
            // onClick={(e) => {
            //   //console.log(e.currentTarget);
            //   document.querySelector("#parent").addEventListener(
            //     "click",
            //     (e) => {
            //       //console.log("came from img tag", e.target);
            //       const { id, tagName, parentNode } = e.target;
            //       console.log(id, tagName, parentNode);
            //       if (tagName === "DIV") {
            //         console.log(id);
            //         addToWatchList(id);
            //       } else {
            //         console.log(parentNode?.id);
            //         addToWatchList(parentNode?.id);
            //       }
            //     },
            //     false
            //   );
            // }}
          >
            {movies?.map((item) => {
              return <MovieCard key={item?.id} movie={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieList;
