import React from "react";
import { useContext } from "../../hooks/context/GlobalContext";

const LeaveRoomButton = ({ room }) => {
  const { setParticipants } = useContext();
  const handleRoomDisconnection = () => {
    room.disconnect();
    setParticipants([]);
    const siteUrl = window.location.origin;
    window.location.href = siteUrl;
  };

  return (
    <div className="video_button_container">
      <button className="video_button_end" onClick={handleRoomDisconnection}>
        Leave Room
      </button>
    </div>
  );
};

export default LeaveRoomButton;
