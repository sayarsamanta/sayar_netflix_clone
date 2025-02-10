import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { option } from "../../utils/constants";
function Player() {
  const { videoId } = useParams();
  console.log(videoId);
  const [key, setKey] = useState();
  const fetchKeyOfVideo = async (id) => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      option
    );
    const json = await data.json();
    const filteredMovies = json?.results?.filter(
      (movie) => movie.type === "Clip"
    );
    const videoId = filteredMovies.length ? filteredMovies[0].key : "";
    setKey(videoId);
  };

  useEffect(() => {
    fetchKeyOfVideo(videoId);
  }, [videoId]);
  return (
    <div className="bg-black h-screen justify-center items-center self-center flex rounded-md">
      <ReactPlayer
        width={"60%"}
        muted={true}
        url={`https://www.youtube.com/watch?v=${key}?&theme=dark&autohide=2&modestbranding=1&showinfo=0`}
        frameborder="0"
        controls={true}
      />
    </div>
  );
}

export default Player;
