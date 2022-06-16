import React, { useEffect } from "react";
import { useContext } from "../../hooks/context/GlobalContext";
import { connectToRoom } from "../../utils/twilioUtils";
import RoomLabel from "./RoomLabel";
import TwilioRoom from "./TwilioRoom/TwilioRoom";

const Videos = ({ room, setRoom }) => {
  const { state } = useContext();
  useEffect(() => {
    if (state?.twilioAccessToken) {
      connectToRoom(
        state?.twilioAccessToken,
        state?.roomId,
        setRoom,
        state?.connectOnlyWithAudio,
        state?.setShowOverlay
      );
    }
  }, [state?.twilioAccessToken]);

  return (
    <div className="videos_container">
      <RoomLabel />
      {room && <TwilioRoom room={room} />}
    </div>
  );
};

export default Videos;
