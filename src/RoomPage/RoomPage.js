import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import ParticipantsSection from "./ParticipantsSection/ParticipantsSection";
import VideoSection from "./VideoSection/VideoSection";
import ChatSection from "./ChatSection/ChatSection";
import { getTokenFromTwilio } from "../utils/twilioUtils";
import Overlay from "./Overlay";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import "./RoomPage.css";
import { useContext } from "../hooks/context/GlobalContext";

const RoomPage = () => {
  const history = useHistory();
  const { state, dispatch } = useContext();
  const randomId = uuidv4();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!state.identity || !state.roomId) history.push("/");
    else {
      const response = await axios.get(
        `https://twilio-unleashed-4247-dev.twil.io/token-service?identity=${randomId}${state?.identity}`
      );
      if (response.data.accessToken) {
        dispatch({
          type: "SET_TWILIO_ACCESS_TOKEN",
          payload: { token: response.data.accessToken },
        });
      }
    }
  }, []);

  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      {state?.showLoadingOverlay && <Overlay />}
    </div>
  );
};

export default RoomPage;
