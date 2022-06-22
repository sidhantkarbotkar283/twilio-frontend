import React, { useEffect } from "react";
import { useContext } from "../hooks/context/GlobalContext";
import ConnectingButtons from "./ConnectingButtons";
import { Button } from "@mui/material";
import "./IntroductionPage.css";
import { useHistory } from "react-router-dom";

const IntroductionPage = () => {
  const { dispatch } = useContext();
  const history = useHistory();
  useEffect(() => {
    dispatch({ type: "SET_IS_ROOM_HOST", payload: { isRoomHost: false } });
  }, []);

  const pushToJoinRoomPageAsHost = () => {
    history.push("/join-room?host=true");
  };

  const pushToJoinRoomPage = () => {
    history.push("/join-room");
  };

  return (
    <div className="width-100 vh-center height-100vh">
      <div className="introduction_page_panel flex flex-column vh-center flex-evenly">
        <h1>video chat application</h1>
        <div className="flex flex-column v-center mt-5">
          <Button
            variant="contained"
            onClick={pushToJoinRoomPage}
            sx={{ width: "220px", mb: 2 }}
          >
            Join a meeting
          </Button>
          <Button
            variant="outlined"
            onClick={pushToJoinRoomPageAsHost}
            sx={{ width: "180px" }}
          >
            Host a meeting
          </Button>
        </div>
        {/* <ConnectingButtons /> */}
      </div>
    </div>
  );
};

export default IntroductionPage;
