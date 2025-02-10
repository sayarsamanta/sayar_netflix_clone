import React, { useEffect } from "react";
import { option } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addMovieTrailer } from "../redux/slice/MovieSlice";

function useFetchMovieTrailer({ id }) {
  const dispatch = useDispatch();
  const fetchMovieVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      option
    );
    const json = await data.json();
    dispatch(addMovieTrailer(json?.results));
  };
  useEffect(() => {
    fetchMovieVideo();
  }, [id]);
  return <div></div>;
}

export default useFetchMovieTrailer;
