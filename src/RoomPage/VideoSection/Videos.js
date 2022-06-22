import React, { useEffect } from "react";
import { useContext } from "../../hooks/context/GlobalContext";
import { connectToRoom } from "../../utils/twilioUtils";
import TwilioRoom from "./TwilioRoom/TwilioRoom";

const Videos = ({ room, setRoom }) => {
  const { state, setShowOverlay } = useContext();
  useEffect(() => {
    if (state?.twilioAccessToken) {
      connectToRoom(
        state?.twilioAccessToken,
        state?.roomId,
        setRoom,
        state?.connectOnlyWithAudio,
        setShowOverlay
      );
    }
  }, [state?.twilioAccessToken]);

  return (
    <div className="videos_container">
      <div>ID: {state?.roomId}</div>
      {room && (
        <TwilioRoom room={room} contextParticipants={state?.participants} />
      )}
    </div>
  );
};

export default Videos;
