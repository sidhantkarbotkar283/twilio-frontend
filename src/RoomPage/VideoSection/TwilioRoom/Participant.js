import React, { useEffect, useState, useRef } from "react";
import { useContext } from "../../../hooks/context/GlobalContext";
import { getParticipantName } from "./../../../utils/twilioUtils";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";

function Participant({ participant, localParticipant = false }) {
  const {
    state,
    dispatch,
    isScreenSharing,
    setIsScreenSharing,
    setScreenSharingTrack,
  } = useContext();
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();

  const [mic, setMic] = useState(null);
  const [cam, setCam] = useState(null);

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        track.on("enabled", () => {
          setCam(true);
        });
        track.on("disabled", () => {
          setCam(false);
        });
        if (track.name === "screen-share-track")
          setScreenSharingTrack(participant);
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        track.on("enabled", () => {
          setMic(true);
        });
        track.on("disabled", () => {
          setMic(false);
        });
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      } else if (track.kind === "data")
        track.on("message", (data) => {
          dispatch({
            type: "ADD_MESSAGES",
            payload: { messages: JSON.parse(data) },
          });
        });
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video")
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      else if (track.kind === "audio")
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    if (videoTracks.length === 2) setIsScreenSharing(true);
    else {
      setIsScreenSharing(false);
      setScreenSharingTrack(null);
    }
    videoTracks.map((track) => {
      if (track) {
        track.attach(videoRef.current);
        return () => {
          track.detach();
        };
      }
    });
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => audioTrack.detach();
    }
  }, [audioTracks]);

  return (
    <>
      <div
        className={`participant width-100  ${
          !isScreenSharing &&
          (state?.participants?.length === 1
            ? "two-rows"
            : state?.participants?.length > 1
            ? "three-rows"
            : "")
        }
        ${
          isScreenSharing &&
          (videoTracks.length === 2 ? "one-row" : "non-visible")
        }
        `}
      >
        <div className="participant-info flex flex-col v-center">
          <h3>{getParticipantName(participant.identity)}</h3>
          {!localParticipant && (
            <>
              {mic ? <MicIcon /> : <MicOffIcon />}
              {cam ? <CameraAltIcon /> : <NoPhotographyIcon />}
            </>
          )}
        </div>
        <video ref={videoRef} />
        <audio ref={audioRef} />
      </div>
    </>
  );
}

export default Participant;
