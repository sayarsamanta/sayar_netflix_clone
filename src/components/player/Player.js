import React from "react";
import ReactPlayer from "react-player";
function Player() {
  return (
    <div className="bg-black h-screen">
      <ReactPlayer
        width={"100%"}
        height={"100%"}
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
      />
    </div>
  );
}

export default Player;
