import React from "react";
import { useHistory } from "react-router-dom";
import { useContext } from "../hooks/context/GlobalContext";

const Button = ({ buttonText, cancelButton, onClickHandler }) => {
  const buttonClass = cancelButton
    ? "join_room_cancel_button"
    : "join_room_success_button";

  return (
    <button onClick={onClickHandler} className={buttonClass}>
      {buttonText}
    </button>
  );
};

const JoinRoomButtons = ({ handleJoinToRoom }) => {
  const { state } = useContext();
  const successButtonText = state.isRoomHost ? "Host" : "Join";

  const history = useHistory();

  const pushToIntroductionPage = () => {
    history.push("/");
  };

  return (
    <div className="join_room_buttons_container">
      <Button
        buttonText={successButtonText}
        onClickHandler={handleJoinToRoom}
      />
      <Button
        buttonText="Cancel"
        cancelButton
        onClickHandler={pushToIntroductionPage}
      ></Button>
    </div>
  );
};

export default JoinRoomButtons;
