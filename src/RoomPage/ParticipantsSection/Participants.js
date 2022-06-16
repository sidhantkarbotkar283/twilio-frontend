import React from "react";
import { useContext } from "../../hooks/context/GlobalContext";

const SingleParticipant = ({ identity, lastItem }) => {
  const getParticipantName = (identity) => {
    return identity.slice(36, identity.length);
  };

  return (
    <>
      <p className="participants_paragraph">
        {/* {getParticipantName(identity)} */}
        {identity.slice(36, identity.length)}
      </p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = () => {
  const { state } = useContext();
  return (
    <div className="participants_container">
      {state?.participants.map((participant, index) => (
        <SingleParticipant
          // key={participant.identity}
          // identity={participant.identity}
          key={participant}
          identity={participant}
          lastItem={state?.participants.length === index + 1}
        />
      ))}
    </div>
  );
};

export default Participants;
