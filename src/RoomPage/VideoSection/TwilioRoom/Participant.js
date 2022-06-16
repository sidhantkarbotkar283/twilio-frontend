import React, { useEffect, useState } from "react";
import { useContext } from "../../../hooks/context/GlobalContext";
import AudioTrack from "./AudioTrack";
import VideoTrack from "./VideoTrack";

function Participant({ localParticipant, participant }) {
  const existingPublications = Array.from(participant.tracks.values());
  const { dispatch } = useContext();

  const existingTracks = existingPublications.map(
    (publication) => publication.track
  );

  const nonNullTracks = existingTracks.filter((track) => track !== null);
  const [tracks, setTracks] = useState(nonNullTracks);
  const addTrack = (track) => {
    if (track) {
      setTracks([...tracks, track]);
    }
  };

  const removeTrack = (track) => {
    if (track) {
      const newTracks = tracks.filter((t) => t.name !== track.trackName);
      setTracks(newTracks);
    }
  };

  useEffect(() => {
    if (!localParticipant) {
      participant.on("trackSubscribed", (track) => {
        if (track.kind === "data") {
          track.on("message", (data) => {
            dispatch({
              type: "ADD_MESSAGES",
              payload: { messages: JSON.parse(data) },
            });
          });
        } else addTrack(track);
      });
      participant.on("trackUnpublished", (track) => removeTrack(track));
    }
  }, [participant]);

  return (
    <div className="participant" id={participant.identity}>
      {tracks.map((track) => {
        if (track.kind === "audio") {
          return <AudioTrack key={track} track={track} />;
        }

        if (track.kind === "video") {
          return <VideoTrack key={track} track={track} />;
        }
      })}
    </div>
  );
}

export default Participant;
