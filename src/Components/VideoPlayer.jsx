import React, { useRef } from "react";
import { HowToDownloadVideo } from "../constant";

const VideoPlayer = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  const handleVolumeChange = (event) => {
    videoRef.current.volume = event.target.value;
  };

  // Prevent right-click on the video element
  const handleContextMenu = (event) => {
    event.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-black w-full max-w-xl p-4">
        <video
          ref={videoRef}
          className="w-full"
          controls
          
        >
          <source
            src={HowToDownloadVideo}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
