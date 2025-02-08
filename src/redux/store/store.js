import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../slice/UserSlice";
import MovieSlice from "../slice/MovieSlice";
import SearchSlice from "../slice/SearchSlice";
import FavoriteSlice from "../slice/FavoriteSlice";

const store = configureStore({
  reducer: {
    favorite: FavoriteSlice,
    user: UserSlice,
    movie: MovieSlice,
    search: SearchSlice,
  },
});

export default store;
