import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "../../../hooks/context/GlobalContext";
import { getParticipantName } from "../../../utils/twilioUtils";
import Participant from "./Participant";

function TwilioRoom({ room }) {
  const {
    participants,
    setParticipants,
    state,
    dispatch,
    isScreenSharing,
    screenSharingTrack,
  } = useContext();

  const handleAddParticipant = (sid) => {
    dispatch({
      type: "UPDATE_PARTICIPANT_PERMISSION",
      payload: {
        sid: sid,
      },
    });
    console.log("updated", state?.participants);
  };

  useEffect(() => {
    const participantConnected = (participant) => {
      console.log(participant);
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
      dispatch({
        type: "ADD_PARTICIPANTS",
        payload: {
          participant: getParticipantName(participant.identity),
          participantSID: participant.sid,
        },
      });
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);

    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  useEffect(() => {
    if (state?.isRoomHost) {
      console.log(room?.localParticipant?.identity);
      dispatch({
        type: "SET_ROOM_HOST",
        payload: { host: room?.localParticipant?.identity },
      });
    }
  }, []);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <div
        className={`remote-participants ${
          state?.participants?.length === 0 ? "height-100" : ""
        }`}
      >
        {room && (
          <Participant
            localParticipant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        )}
        {remoteParticipants}
      </div>
    </div>
  );
}

export default TwilioRoom;
