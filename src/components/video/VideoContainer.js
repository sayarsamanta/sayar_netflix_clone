import React from "react";
import VideoTitle from "./VideoTitle";
import VideoPlayer from "./VideoPlayer";
import { useSelector } from "react-redux";

function VideoContainer({ itemIndex }) {
  const { topRated } = useSelector((store) => store?.movie);
  if (!topRated.length) return;
  return (
    <div className="flex h-screen">
      <VideoTitle itemIndex={itemIndex} />
      <VideoPlayer id={topRated[itemIndex]?.id} />
    </div>
  );
}

export default VideoContainer;
