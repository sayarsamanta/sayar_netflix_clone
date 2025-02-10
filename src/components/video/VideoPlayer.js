import React from "react";
import useFetchMovieTrailer from "../../hooks/useFetchMovieTrailer";
import { useSelector } from "react-redux";

function VideoPlayer(id) {
  const { movieTrailer } = useSelector((store) => store?.movie);
  useFetchMovieTrailer(id);
  if (!movieTrailer?.length) return;

  const filteredMovies = movieTrailer?.filter(
    (movie) => movie.type === "Trailer"
  );
  const videoId = filteredMovies.length
    ? filteredMovies[0].key
    : movieTrailer[0].key;
  return (
    <div className="bg-black">
      <iframe
        class="h-full w-screen aspect-video border: none m:none; p:none pointer-events-none"
        title="Youtube player"
        allow="autoplay; encrypted-media"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://youtube.com/embed/${videoId}?autoplay=1&mute=1&showinfo=0&controls=0&modestbranding=1&autohide=1&playsinline=1&color=white&loop=1&playlist=${videoId}`}
      ></iframe>
    </div>
  );
}

export default VideoPlayer;
