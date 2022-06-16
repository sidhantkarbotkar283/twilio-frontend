import React from "react";
import { useContext } from "../hooks/context/GlobalContext";

const JoinRoomTitle = () => {
  const { state } = useContext();
  const titleText = state?.isRoomHost ? "Host meeting" : "Join meeting";
  return <p className="join_room_title">{titleText}</p>;
};

export default JoinRoomTitle;
