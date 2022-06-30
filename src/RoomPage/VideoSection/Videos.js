import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "../../hooks/context/GlobalContext";
import { connectToRoom } from "../../utils/twilioUtils";
import TwilioRoom from "./TwilioRoom/TwilioRoom";

const Videos = ({ room, setRoom }) => {
  const { state, setShowOverlay, dispatch } = useContext();

  const [granted, setGranted] = useState(false);

  useEffect(() => {
    if (state?.isRoomHost) {
      if (state?.participants?.length > 0) {
        console.log("addded");
        console.log(
          state?.participants[state?.participants.length - 1].granted
        );
        setGranted(state?.participants[state?.participants.length - 1].granted);
      }
    }
  }, [state?.participants]);

  useEffect(() => {
    if (state?.twilioAccessToken) {
      console.log("granted", granted);
      connectToRoom(
        state?.twilioAccessToken,
        state?.roomId,
        setRoom,
        state?.connectOnlyWithAudio,
        setShowOverlay,
        state?.isRoomHost,
        state?.identity
      );
    }
  }, [state?.twilioAccessToken]);

  return (
    <div className="videos_container">
      <div>ID: {state?.roomId}</div>

      {room && <TwilioRoom room={room} />}
    </div>
  );
};

export default Videos;
