import { createSlice } from "@reduxjs/toolkit";

const FavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    favorites: [],
  },
  reducers: {
    addFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites.splice(action.payload, 1);
    },
  },
});

export const { addFavorites, removeFavorite } = FavoriteSlice.actions;

export default FavoriteSlice.reducer;
