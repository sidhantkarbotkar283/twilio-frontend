import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const VideoTrack = ({ track, participant }) => {
  const trackRef = useRef();

  useEffect(() => {
    console.log("this is ", participant.slice(36, participant.length));
    const child = track.attach();
    console.log("child", child);
    // trackRef.current.classList.add(track.kind);
    trackRef.current.classList.add("video");
    trackRef.current.appendChild(child);
    console.log("trackRef", trackRef);

    const videosPortal = document.getElementById("videos_portal");

    if (!videosPortal.classList.contains("videos_portal_styles")) {
      videosPortal.classList.add("videos_portal_styles");
    }
  }, []);

  const content = (
    <div className="video_track_container">
      <div ref={trackRef} id={participant.slice(36, participant.length)} />
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
