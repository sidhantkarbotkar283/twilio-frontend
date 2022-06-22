import React from "react";
import { useContext } from "../../hooks/context/GlobalContext";

const SingleParticipant = ({ identity, lastItem }) => {
  const getParticipantName = (identity) => {
    return identity.slice(36, identity.length);
  };

  return (
    <>
      <p className="participants_paragraph">{getParticipantName(identity)}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = () => {
  const { participants } = useContext();
  console.log(participants);
  return (
    <div className="participants_container">
      {participants.map((participant, index) => (
        <SingleParticipant
          key={index}
          identity={participant.identity}
          lastItem={participants.length === index + 1}
        />
      ))}
    </div>
  );
};

export default Participants;
