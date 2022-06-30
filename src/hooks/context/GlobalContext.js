import React, { useState } from "react";
import { GlobalReducer } from "../reducer/reducer";

const initialState = {
  identity: "",
  showLoadingOverlay: false,
  isRoomHost: false,
  roomHost: "",
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
  const [granted, setGranted] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [isScreenSharing, setIsScreenSharing] = React.useState(false);

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
        granted,
        setGranted,
        open,
        setOpen,
      }}
    >
      {children}
    </ContextElement.Provider>
  );
}

export function useContext() {
  return React.useContext(ContextElement);
}
