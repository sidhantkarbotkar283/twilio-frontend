import React, { useState } from "react";
import AlertDialog from "../../common/dialogue";
import { useContext } from "../../hooks/context/GlobalContext";
import VideoButtons from "./VideoButtons";
import Videos from "./Videos";

const VideoSection = () => {
  const [room, setRoom] = useState(null);
  const { state } = useContext();

  return (
    <div className="video_section_container">
      <Videos room={room} setRoom={setRoom} />
      <VideoButtons room={room} />
      {state?.isRoomHost && <AlertDialog />}
    </div>
  );
};

export default VideoSection;
