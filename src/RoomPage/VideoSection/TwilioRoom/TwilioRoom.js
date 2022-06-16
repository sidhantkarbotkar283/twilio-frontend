import React, { useEffect, useState } from "react";
import { useContext } from "../../../hooks/context/GlobalContext";
import Participant from "./Participant";

function TwilioRoom({ room }) {
  const { state, dispatch } = useContext();
  const remoteParticipantsArray = Array.from(room.participants.values());

  const [remoteParticipants, setRemoteParticipants] = useState(
    remoteParticipantsArray
  );

  const addParticipantToContext = (participant) => {
    const participants = state?.participants;
    if (participants.find((p) => p.identity === participant.identity)) return;
    else {
      const newParticipants = [
        ...participants,
        { identity: participant.identity },
      ];
      console.log("nnewParticipants", newParticipants);
      dispatch({
        type: "ADD_PARTICIPANT",
        payload: { participant: participant.identity },
      });
    }
  };

  const addParticipant = (participant) => {
    console.log(`${participant.identity} has joined the room`);
    addParticipantToContext(participant);
    setRemoteParticipants(Array.from(room.participants.values()));
  };

  const removeParticipantFromContext = (participant) => {
    dispatch({
      type: "REMOVE_PARTICIPANT",
      payload: { participants: participant },
    });
  };

  const removeParticipant = (participant) => {
    console.log(`${participant.identity} has left the room`);
    removeParticipantFromContext(participant);
    setRemoteParticipants(Array.from(room.participants.values()));
  };

  useEffect(() => {
    console.log(state);
    addParticipant(room.localParticipant);
    remoteParticipants.map((remoteParticipant) =>
      addParticipantToContext(remoteParticipant)
    );

    room.on("participantConnected", (participant) => {
      addParticipant(participant);
    });

    room.on("participantDisconnected", (participant) => {
      removeParticipant(participant);
    });
  }, []);

  return (
    <div className="room">
      <div className="participants">
        <Participant
          key={room.localParticipant.identity}
          localParticipant
          participant={room.localParticipant}
        />
        {remoteParticipants &&
          remoteParticipants?.map((participant) => (
            <Participant key={participant.identity} participant={participant} />
          ))}
      </div>
    </div>
  );
}

export default TwilioRoom;
