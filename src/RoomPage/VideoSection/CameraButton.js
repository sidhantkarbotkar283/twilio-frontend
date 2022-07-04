import React, { useState } from "react";

import CameraButtonImg from "../../resources/images/camera.svg";
import CameraButtonImgOff from "../../resources/images/cameraOff.svg";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import { IconButton } from "@mui/material";

const CameraButton = ({ room }) => {
  const [isLocalVideoTrackDisabled, setIsLocalVideoTrackDisabled] =
    useState(false);

  const handleCameraButtonPressed = () => {
    isLocalVideoTrackDisabled ? startVideo() : stopVideo();

    setIsLocalVideoTrackDisabled(!isLocalVideoTrackDisabled);
  };

  const startVideo = () => {
    // start sending back video stream to other users
    room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
      if (!localVideoTrackPublication.trackName !== "screen-share-track")
        localVideoTrackPublication.track.enable();
    });
  };

  const stopVideo = () => {
    // stop sending camera stream to other users
    room.localParticipant.videoTracks.forEach((localVideoTrackPublication) => {
      if (localVideoTrackPublication.trackName !== "screen-share-track")
        localVideoTrackPublication.track.disable();
    });
  };

  return (
    <div className="video_button_container">
      <IconButton onClick={handleCameraButtonPressed} sx={{ color: "white" }}>
        {isLocalVideoTrackDisabled ? <NoPhotographyIcon /> : <CameraAltIcon />}
      </IconButton>
    </div>
  );
};

export default CameraButton;
