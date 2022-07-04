import React from "react";
import { useContext } from "../../hooks/context/GlobalContext";
import { IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";

const MicButton = ({ room }) => {
  const { isMicMuted, setIsMicMuted } = useContext();
  const handleMicButtonPressed = () => {
    isMicMuted ? unmute() : mute();
    setIsMicMuted(!isMicMuted);
  };

  const mute = () => {
    // mute our microphone so other users will be not able to hear us
    room?.localParticipant?.audioTracks?.forEach((localAudioTrackPublication) =>
      localAudioTrackPublication.track.disable()
    );
  };

  const unmute = () => {
    // turn on mic back
    room?.localParticipant?.audioTracks?.forEach((localAudioTrackPublication) =>
      localAudioTrackPublication.track.enable()
    );
  };

  return (
    <div className="video_button_container">
      <IconButton onClick={handleMicButtonPressed} sx={{ color: "white" }}>
        {isMicMuted ? <MicOffIcon /> : <MicIcon />}
      </IconButton>
    </div>
  );
};

export default MicButton;
