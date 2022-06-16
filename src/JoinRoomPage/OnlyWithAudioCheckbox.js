import React from "react";
import { useContext } from "../hooks/context/GlobalContext";
import CheckImg from "../resources/images/check.png";

const OnlyWithAudioCheckbox = (props) => {
  //const { connectOnlyWithAudio, setConnectOnlyWithAudio } = props;

  const { state, dispatch } = useContext();
  const handleConnectionTypeChange = () => {
    dispatch({
      type: "SET_CONNECT_ONLY_WITH_AUDIO",
      payload: { connectOnlyWithAudio: !state?.connectOnlyWithAudio },
    });
  };

  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {state?.connectOnlyWithAudio && (
          <img className="checkbox_image" src={CheckImg}></img>
        )}
      </div>
      <p className="checkbox_container_paragraph">Only audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
