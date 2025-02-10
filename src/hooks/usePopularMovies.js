import { useEffect } from "react";
import { option } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../redux/slice/MovieSlice";

function usePopularMovies() {
  const dispatch = useDispatch();
  const fetchPopularMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      option
    );
    const json = await data.json();
    //console.log(json);
    dispatch(addPopularMovies(json?.results));
  };

  useEffect(() => {
    fetchPopularMovies();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return;
}

export default usePopularMovies;
