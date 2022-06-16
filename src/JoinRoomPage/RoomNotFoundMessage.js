import React from "react";
import { useContext } from "../hooks/context/GlobalContext";

const RoomNotFoundMessage = ({ showRoomNotFoundMessage }) => {
  const { state } = useContext();
  return (
    <div className="room_not_found_container">
      {state?.showRoomNotFoundMessage && (
        <p className="room_not_found_paragraph">
          Room has not been found. Please try again.
        </p>
      )}
    </div>
  );
};

export default RoomNotFoundMessage;
