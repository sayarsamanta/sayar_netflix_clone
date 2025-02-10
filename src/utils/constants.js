export const profileImage =
  "https://occ-0-3777-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png";

export const option = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: process.env.REACT_APP_TMDB_ACCESS_TOKEN,
  },
};

export const top_ratedApi =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

export const movie_poster_base_url = "https://image.tmdb.org/t/p/original/";
