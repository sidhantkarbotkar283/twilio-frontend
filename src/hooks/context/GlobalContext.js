import React, { useState } from "react";
import { GlobalReducer } from "../reducer/reducer";

const initialState = {
  identity: "",
  showLoadingOverlay: false,
  isRoomHost: false,
  connectOnlyWithAudio: false,
  roomId: null,
  twilioAccessToken: null,
  showOverlay: true,
  showRoomNotFoundMessage: false,
  participants: [],
  remoteParticipants: [],
  messages: [],
};

const ContextElement = React.createContext();

export default function GlobalContext({ children }) {
  const [state, dispatch] = React.useReducer(GlobalReducer, initialState);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [showOverlay, setShowOverlay] = useState(true);
  return (
    <ContextElement.Provider
      value={{
        state,
        dispatch,
        isMicMuted,
        setIsMicMuted,
        participants,
        setParticipants,
        showOverlay,
        setShowOverlay,
      }}
    >
      {children}
    </ContextElement.Provider>
  );
}

export function useContext() {
  return React.useContext(ContextElement);
}
