import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useContext } from "../../../hooks/context/GlobalContext";
import { getParticipantName } from "../../../utils/twilioUtils";
import Participant from "./Participant";

function TwilioRoom({ room }) {
  const { participants, setParticipants, state, dispatch } = useContext();

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

  const remoteParticipants = participants.map((participant, index) => (
    // state?.participants[index]?.granted &
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <div className="local-participant">
        {room ? (
          <Participant
            localParticipant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        ) : (
          ""
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
}

export default TwilioRoom;
