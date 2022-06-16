import React from "react";
import { useContext } from "../../hooks/context/GlobalContext";

const RoomLabel = () => {
  const { state } = useContext();
  return (
    <div className="room_label">
      {/* <p className="room_label_paragraph"> */}
      <div>
        ID: {state?.roomId} {"\n"}
      </div>
      <div>Name : {state?.identity}</div>
      {/* </p> */}
    </div>
  );
};

export default RoomLabel;
