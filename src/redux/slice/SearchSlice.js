import { createSlice } from "@reduxjs/toolkit";

const SearchSlice = createSlice({
  name: "search",
  initialState: {
    showSearch: false,
    searchedMovies: [],
  },
  reducers: {
    setShowSearch: (state, action) => {
      state.showSearch = !state.showSearch;
    },
    setSearchedMovies: (state, action) => {
      state.searchedMovies = action.payload;
    },
  },
});

export const { setShowSearch, setSearchedMovies } = SearchSlice.actions;

export default SearchSlice.reducer;
