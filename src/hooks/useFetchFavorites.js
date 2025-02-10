import React, { useEffect } from "react";
import { option } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addFavorites } from "../redux/slice/FavoriteSlice";

function useFetchFavorites() {
  const dispatch = useDispatch();
  const fetchFavorites = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/account/${process.env.REACT_APP_TMDB_ACCOUNT_ID}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
      option
    );
    const json = await data.json();
    dispatch(addFavorites(json?.results));
  };
  useEffect(() => {
    fetchFavorites();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div></div>;
}

export default useFetchFavorites;
