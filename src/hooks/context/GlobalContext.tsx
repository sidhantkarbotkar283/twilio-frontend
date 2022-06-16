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
  setAcessTokenFunction: (token: any) => {
    initialState.twilioAccessToken = token;
  },
  setShowOverlay: (set: boolean) => {
    initialState.showOverlay = set;
  },
  setMessages: (newMessages: any) => {
    initialState.messages = newMessages;
  },
};

type GlobalContextStateType = {
  state: any;
  dispatch: (action: any) => void;
};

const ContextElement = React.createContext<GlobalContextStateType>(
  {} as GlobalContextStateType
);

type Props = {
  children: React.ReactNode;
};

export default function GlobalContext({ children }: Props): JSX.Element {
  const [state, dispatch] = React.useReducer<any>(GlobalReducer, initialState);
  return (
    <ContextElement.Provider value={{ state, dispatch }}>
      {children}
    </ContextElement.Provider>
  );
}

export function useContext() {
  return React.useContext(ContextElement);
}
