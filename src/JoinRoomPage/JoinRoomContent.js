import React, { useState } from "react";
import JoinRoomInputs from "./JoinRoomInputs";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import RoomNotFoundMessage from "./RoomNotFoundMessage";
import JoinRoomButtons from "./JoinRoomButtons";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { checkIfRoomExists } from "../utils/twilioUtils";
import { useContext } from "../hooks/context/GlobalContext";

const JoinRoomContent = ({ setShowLoadingOverlay }) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const history = useHistory();

  const { state, dispatch } = useContext();

  React.useEffect(() => {
    dispatch({
      type: "SET_SHOW_ROOMNOTFOUND",
      payload: { showRoomNotFoundMessage: false },
    });
  }, []);

  const handleJoinToRoom = async () => {
    dispatch({
      type: "SET_IDENTITY",
      payload: { identity: nameValue },
    });
    if (!state.isRoomHost) {
      setShowLoadingOverlay(true);
      const roomExists = await checkIfRoomExists(roomIdValue);
      setShowLoadingOverlay(false);
      if (roomExists) {
        dispatch({
          type: "SET_ROOM_ID",
          payload: { roomId: roomIdValue },
        });
        history.push("/room");
      } else
        dispatch({
          type: "SET_SHOW_ROOMNOTFOUND",
          payload: { showRoomNotFoundMessage: true },
        });
    } else {
      dispatch({
        type: "SET_ROOM_ID",
        payload: { roomId: uuidv4() },
      });
      history.push("/room");
    }
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={state.isRoomHost}
      />
      <OnlyWithAudioCheckbox />
      <RoomNotFoundMessage />
      <JoinRoomButtons handleJoinToRoom={handleJoinToRoom} />
    </>
  );
};

export default JoinRoomContent;
