import React from "react";
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
  messages: [],
  setAcessTokenFunction: (token) => {
    initialState.twilioAccessToken = token;
  },
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
  return (
    <ContextElement.Provider value={{ state, dispatch }}>
      {children}
    </ContextElement.Provider>
  );
}

export function useContext() {
  return React.useContext(ContextElement);
}
