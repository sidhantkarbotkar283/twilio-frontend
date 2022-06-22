import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { checkIfRoomExists } from "../utils/twilioUtils";
import { useContext } from "../hooks/context/GlobalContext";
import { TextField, Button } from "@mui/material";

const JoinRoomContent = ({ setShowLoadingOverlay }) => {
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const history = useHistory();

  const { state, dispatch } = useContext();

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

  React.useEffect(() => {
    dispatch({
      type: "SET_SHOW_ROOMNOTFOUND",
      payload: { showRoomNotFoundMessage: false },
    });
  }, []);

  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.target.value);
  };

  const handleNameValueChange = (event) => {
    setNameValue(event.target.value);
  };

  const pushToIntroductionPage = () => {
    history.push("/");
  };

  return (
    <>
      <div className="join_room_inputs_container">
        {!state.isRoomHost && (
          <TextField
            label="Enter meeting ID"
            value={roomIdValue}
            size="small"
            className="join_room_input"
            onChange={handleRoomIdValueChange}
          />
        )}
        <TextField
          label="Enter your Name"
          value={nameValue}
          size="small"
          className="join_room_input"
          onChange={handleNameValueChange}
        />
      </div>
      <div className="room_not_found_container">
        {state?.showRoomNotFoundMessage && (
          <p className="room_not_found_paragraph">
            Room has not been found. Please try again.
          </p>
        )}
      </div>
      <div className="flex width-100 h-center gap-20">
        <Button variant="contained" onClick={handleJoinToRoom}>
          {state?.isRoomHost ? "Host" : "Join"}
        </Button>
        <Button variant="outlined" onClick={pushToIntroductionPage}>
          Cancel
        </Button>
      </div>
    </>
  );
};

export default JoinRoomContent;
