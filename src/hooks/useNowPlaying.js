import { useEffect } from "react";
import { option } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addNowPlaying } from "../redux/slice/MovieSlice";

function useNowPlaying() {
  const dispatch = useDispatch();
  const fetchUpComingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      option
    );
    const json = await data.json();
    //console.log(json);
    dispatch(addNowPlaying(json?.results));
  };

  useEffect(() => {
    fetchUpComingMovies();
  }, []);
  return;
}

export default useNowPlaying;
