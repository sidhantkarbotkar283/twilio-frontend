import React from "react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import LeaveRoomButton from "./LeaveRoomButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import { useContext } from "../../hooks/context/GlobalContext";

const VideoButtons = ({ room }) => {
  const { state } = useContext();
  return (
    <div className="video_buttons_container">
      <MicButton room={room} />
      {!state?.connectOnlyWithAudio && <CameraButton room={room} />}
      <LeaveRoomButton room={room} />
      <SwitchToScreenSharingButton room={room} />
    </div>
  );
};

export default VideoButtons;
