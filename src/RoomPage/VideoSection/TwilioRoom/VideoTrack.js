import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const VideoTrack = ({ track, participant }) => {
  const trackRef = useRef();

  useEffect(() => {
    const child = track.attach();
    trackRef.current.classList.add(track.kind);
    trackRef.current.appendChild(child);

    const videosPortal = document.getElementById("videos_portal");

    if (!videosPortal.classList.contains("videos_portal_styles"))
      videosPortal.classList.add("videos_portal_styles");
  }, []);

  const content = (
    <div className="video_track_container">
      <div ref={trackRef}></div>
      <div className="participant-name">
        {participant.slice(36, participant.length)}
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("videos_portal")
  );
};

export default VideoTrack;
