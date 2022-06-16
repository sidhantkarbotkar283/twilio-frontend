import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";
import LoadingOverlay from "./LoadingOverlay";

import "./JoinRoomPage.css";
import { useContext } from "../hooks/context/GlobalContext";

const JoinRoomPage = () => {
  //const { setIsRoomHostAction, isRoomHost } = props;

  const search = useLocation().search;
  const { state, dispatch } = useContext();

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost) {
      //setIsRoomHostAction(true);
      dispatch({ type: "SET_IS_ROOM_HOST", payload: { isRoomHost: true } });
    }
  }, []);

  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={state.isRoomHost} />
        <JoinRoomContent setShowLoadingOverlay={setShowLoadingOverlay} />
        {showLoadingOverlay && <LoadingOverlay />}
      </div>
    </div>
  );
};

export default JoinRoomPage;
