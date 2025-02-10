import { useEffect } from "react";
import { option } from "../utils/constants";
import { useDispatch } from "react-redux";
import {
  addNowPlaying,
  addPopularMovies,
  addTopRated,
  addUpcomingMovies,
} from "../redux/slice/MovieSlice";
function useFetchTopRatedMovies() {
  const dispatch = useDispatch();
  const fetchMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      option
    );
    const json = await data.json();
    if (json?.results?.length) {
      dispatch(addTopRated(json?.results));
    }
  };
  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const urls = [
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=ES",
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    ];
    Promise.all(urls.map((url) => fetch(url, option).then((r) => r.json())))
      .then((response) => {
        dispatch(addTopRated(response[0]?.results));
        dispatch(addUpcomingMovies(response[1]?.results));
        dispatch(addNowPlaying(response[2]?.results));
        dispatch(addPopularMovies(response[3]?.results));
      })
      .catch((error) => console.log(error));
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return;
}

export default useFetchTopRatedMovies;
