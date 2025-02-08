import React, { useEffect } from "react";
import { option } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../redux/slice/MovieSlice";

function useFetchUpcomingMovies() {
  const dispatch = useDispatch();
  const fetchUpComingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=ES",
      option
    );
    const json = await data.json();
    //console.log(json);
    dispatch(addUpcomingMovies(json?.results));
  };

  useEffect(() => {
    fetchUpComingMovies();
  }, []);
  return;
}

export default useFetchUpcomingMovies;
