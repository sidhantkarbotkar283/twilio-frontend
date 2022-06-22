import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Participants from "./ParticipantsSection/Participants";
import VideoSection from "./VideoSection/VideoSection";
import ChatSection from "./ChatSection/ChatSection";
import Overlay from "./Overlay";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { Tabs, Tab } from "@mui/material";

import "./RoomPage.css";
import { useContext } from "../hooks/context/GlobalContext";

const RoomPage = () => {
  const history = useHistory();
  const { state, dispatch, showOverlay } = useContext();
  const randomId = uuidv4();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    if (!state.identity || !state.roomId) history.push("/");
    else {
      const response = await axios.get(
        `https://twilio-unleashed-9360-dev.twil.io/token-service?identity=${randomId}${state?.identity}`
      );
      if (response.data.accessToken) {
        dispatch({
          type: "SET_TWILIO_ACCESS_TOKEN",
          payload: { token: response.data.accessToken },
        });
      }
    }
  }, []);

  const [tab, setTab] = useState(0);

  return (
    <div className="room_container">
      {showOverlay && <Overlay />}
      <VideoSection />
      <div className="chat_participant_container">
        <Tabs value={tab} onChange={(event, newValue) => setTab(newValue)}>
          <Tab value={0} label="Participants" />
          <Tab value={1} label="Chat" />
        </Tabs>
        {tab === 0 ? <Participants /> : <ChatSection />}
      </div>
    </div>
  );
};

export default RoomPage;
