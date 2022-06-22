export const GlobalReducer = (state, action) => {
  switch (action.type) {
    case "SET_IDENTITY":
      return {
        ...state,
        identity: action.payload.identity,
      };
    case "SET_IS_ROOM_HOST":
      return {
        ...state,
        isRoomHost: action.payload.isRoomHost,
      };
    case "SET_ROOM_ID":
      return {
        ...state,
        roomId: action.payload.roomId,
      };

    case "SET_CONNECT_ONLY_WITH_AUDIO":
      return {
        ...state,
        connectOnlyWithAudio: action.payload.connectOnlyWithAudio,
      };

    case "SHOW_LOADING_OVERLAY":
      return {
        ...state,
        showLoadingOverlay: action.payload.showOverLay,
      };

    case "SET_TWILIO_ACCESS_TOKEN":
      return {
        ...state,
        twilioAccessToken: action.payload.token,
      };

    case "SET_SHOW_OVERLAY":
      return {
        ...state,
        showOverlay: action.payload.showOverlay,
      };

    case "SET_SHOW_ROOMNOTFOUND":
      return {
        ...state,
        showRoomNotFoundMessage: action.payload.showRoomNotFoundMessage,
      };

    case "SET_MESSAGES":
      return {
        ...state,
        messages: action.payload.messages,
      };

    case "ADD_MESSAGES":
      return {
        ...state,
        messages: [...state?.messages, action.payload.messages],
      };

    default: {
      return state;
    }
  }
};
