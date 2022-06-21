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
  setShowOverlay: (set) => {
    initialState.showOverlay = set;
  },
  setMessages: (newMessages) => {
    initialState.messages = newMessages;
  },
};

const ContextElement = React.createContext();

export default function GlobalContext({ children }) {
  const [state, dispatch] = React.useReducer(GlobalReducer, initialState);
  const [isMicMuted, setIsMicMuted] = useState(false);
  return (
    <ContextElement.Provider
      value={{ state, dispatch, isMicMuted, setIsMicMuted }}
    >
      {children}
    </ContextElement.Provider>
  );
}

export function useContext() {
  return React.useContext(ContextElement);
}
