import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  connect,
  LocalAudioTrack,
  LocalDataTrack,
  LocalVideoTrack,
} from "twilio-video";

// "proxy": "https://videochatgytworkz.herokuapp.com"

// const roomExistsURL = "https://twilio-unleashed-4247-dev.twil.io/room-exists";
const roomExistsURL = "https://twilio-unleashed-9360-dev.twil.io/room-exists";
// const tokenServiceURL =
//   "https://twilio-unleashed-4247-dev.twil.io/token-service";
const tokenServiceURL =
  "https://twilio-unleashed-9360-dev.twil.io/token-service";

const audioConstraints = {
  video: false,
  audio: true,
};

const videoConstraints = {
  audio: true,
  video: {
    width: 640,
    height: 480,
  },
};

let dataChannel = null;

export const getTokenFromTwilio = async (setToken, identity) => {
  const randomId = uuidv4();
  console.log();
  const response = await axios.get(
    `${tokenServiceURL}?identity=${randomId}${identity}`
  );
  if (response.data.accessToken) setToken(response.data.accessToken);
};

export const connectToRoom = async (
  accessToken,
  roomId = "test-room",
  setRoom,
  connectOnlyWithAudio,
  setShowOverlay,
  isRoomHost,
  identity
) => {
  console.log(isRoomHost);

  const constraints = connectOnlyWithAudio
    ? audioConstraints
    : videoConstraints;

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(async (stream) => {
      let tracks;

      // create data track for messages
      const audioTrack = new LocalAudioTrack(stream.getAudioTracks()[0]);
      const dataTrack = new LocalDataTrack();

      dataChannel = dataTrack;
      let videoTrack;

      if (!connectOnlyWithAudio) {
        videoTrack = new LocalVideoTrack(stream.getVideoTracks()[0]);
        tracks = [audioTrack, videoTrack, dataTrack];
      } else {
        tracks = [audioTrack, dataTrack];
      }

      // if (!isRoomHost) {
      //   const content = `${identity} wants to join`;
      //   const stringifiedMessage = JSON.stringify({
      //     identity,
      //     content,
      //   });
      //   dataChannel.send("hello");
      //   console.log(dataChannel);
      // } else {
      const room = await connect(accessToken, {
        name: roomId,
        tracks,
      });

      console.log("succesfully connected with twilio room");
      console.log(room);
      setRoom(room);
      setShowOverlay(false);
      // }
    })
    .catch((err) => {
      console.log(
        "Error occurred when trying to get an access to local devices"
      );
      console.log(err);
    });
};

export const checkIfRoomExists = async (roomId) => {
  const response = await axios.get(`${roomExistsURL}?roomId=${roomId}`);
  return response.data;
};

export const sendMessagesUsingDataChannel = (
  content,
  messageCreatedByMe = false,
  identity
) => {
  const ownMessage = {
    identity,
    content,
    messageCreatedByMe,
  };

  const messageToSent = {
    identity,
    content,
  };

  const stringifiedMessage = JSON.stringify(messageToSent);
  dataChannel.send(stringifiedMessage);

  return ownMessage;
};

export const getParticipantName = (string) => {
  return string.slice(36, string.length);
};
