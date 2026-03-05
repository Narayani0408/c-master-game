import React from "react";
import "./VideoBackground.css";

function VideoBackground() {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="video-bg">
        <source
          src="https://cdn.coverr.co/videos/coverr-programming-code-on-screen-1575/1080p.mp4"
          type="video/mp4"
        />
      </video>
    </div>
  );
}

export default VideoBackground;