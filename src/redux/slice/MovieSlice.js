import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "movie",
  initialState: {
    topRated: [],
    movieTrailer: [],
    upcoming: [],
    popular: [],
    nowPlaying: [],
    movieDetails: {},
    showModal: false,
    recommendations: [],
  },
  reducers: {
    addTopRated: (state, action) => {
      state.topRated = action.payload;
    },
    addMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
    },
    addUpcomingMovies: (state, action) => {
      state.upcoming = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popular = action.payload;
    },
    addNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    addMovieDetails: (state, action) => {
      state.movieDetails = action.payload;
    },
    setModal: (state, action) => {
      state.showModal = !state.showModal;
    },
    addRecommendation: (state, action) => {
      state.recommendations = action.payload;
    },
  },
});

export const {
  addTopRated,
  addMovieTrailer,
  addUpcomingMovies,
  addPopularMovies,
  addNowPlaying,
  addMovieDetails,
  setModal,
  addRecommendation,
} = MovieSlice.actions;

export default MovieSlice.reducer;
