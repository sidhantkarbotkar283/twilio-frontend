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
    else
      dispatch({
        type: "ADD_PARTICIPANT",
        payload: { participant: participant.identity },
      });
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
    // addParticipant(room.localParticipant);
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

  useEffect(() => {
    console.log(state, room);
    console.log("participant", room.localParticipant);
    console.log("array", Array.from(room.participants.values()));
  }, [Array.from(room.participants.values())]);

  return (
    <div className="room">
      <div className="participants">
        <Participant participant={room.localParticipant} />
        {Array.from(room.participants.values()).map((participant, index) => (
          <Participant key={index} participant={participant} />
        ))}
      </div>
    </div>
  );
}

export default TwilioRoom;

// import React, { Component } from "react";
// import Participant from "./Participant";

// class TwilioRoom extends Component {
//   constructor(props) {
//     super(props);

//     const remoteParticipants = Array.from(
//       this.props.room.participants.values()
//     );

//     this.state = {
//       remoteParticipants: remoteParticipants,
//     };

//     remoteParticipants.forEach((participant) => {
//       this.addParticipantToStore(participant);
//     });
//   }

//   componentDidMount() {
//     this.props.room.on("participantConnected", (participant) =>
//       this.addParticipant(participant)
//     );

//     this.props.room.on("participantDisconnected", (participant) => {
//       this.removeParticipant(participant);
//     });
//   }

//   addParticipantToStore(participant) {
//     const participants = this.props.contextParticipants;

//     if (participants.find((p) => p.identity === participant.identity)) {
//       return;
//     } else {
//       const newParticipants = [...participants];
//       newParticipants.push({ identity: participant.identity });
//       // store.dispatch(setParticipants(newParticipants));
//     }
//   }

//   addParticipant(participant) {
//     console.log(`${participant.identity} has joined the room`);
//     this.addParticipantToStore(participant);

//     this.setState({
//       remoteParticipants: [...this.state.remoteParticipants, participant],
//     });
//     console.log(this.props.contextParticipants);
//   }

//   removeParticipantFromStore(participant) {
//     const participants = this.props.contextParticipants.filter(
//       (p) => p.identity !== participant.identity
//     );
//     //store.dispatch(setParticipants(participants));
//   }

//   removeParticipant(participant) {
//     console.log(`${participant.identity} has left the room`);
//     this.removeParticipantFromStore(participant);
//     this.setState({
//       remoteParticipants: this.state.remoteParticipants.filter(
//         (p) => p.identity !== participant.identity
//       ),
//     });
//   }

//   render() {
//     return (
//       <div className="room">
//         <div className="participants">
//           <Participant
//             key={this.props.room.localParticipant.identity}
//             localParticipant
//             participant={this.props.room.localParticipant}
//           />
//           {this.state.remoteParticipants.map((participant) => {
//             return (
//               <Participant
//                 key={participant.identity}
//                 participant={participant}
//               />
//             );
//           })}
//         </div>
//       </div>
//     );
//   }
// }

// export default TwilioRoom;
