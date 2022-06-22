import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JoinRoomContent from "./JoinRoomContent";

import "./JoinRoomPage.css";
import { useContext } from "../hooks/context/GlobalContext";

const JoinRoomPage = () => {
  const search = useLocation().search;
  const { state, dispatch } = useContext();
  const titleText = state?.isRoomHost ? "Host meeting" : "Join meeting";

  useEffect(() => {
    const isRoomHost = new URLSearchParams(search).get("host");
    if (isRoomHost)
      dispatch({ type: "SET_IS_ROOM_HOST", payload: { isRoomHost: true } });
  }, []);

  const [showLoadingOverlay, setShowLoadingOverlay] = useState(false);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <p className="join_room_title">{titleText}</p>
        <JoinRoomContent setShowLoadingOverlay={setShowLoadingOverlay} />
        {showLoadingOverlay && (
          <div className="loading_overlay_container">
            <div className="loading_overlay_loader"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JoinRoomPage;
