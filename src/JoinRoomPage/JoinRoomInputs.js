import React from "react";
import { useContext } from "../hooks/context/GlobalContext";

const Input = ({ placeholder, value, changeHandler }) => {
  return (
    <input
      value={value}
      onChange={changeHandler}
      className="join_room_input"
      placeholder={placeholder}
    />
  );
};

const JoinRoomInputs = (props) => {
  const { roomIdValue, setRoomIdValue, nameValue, setNameValue } = props;

  const { state } = useContext();

  const handleRoomIdValueChange = (event) => {
    setRoomIdValue(event.target.value);
  };

  const handleNameValueChange = (event) => {
    setNameValue(event.target.value);
  };

  return (
    <div className="join_room_inputs_container">
      {!state.isRoomHost && (
        <Input
          placeholder="Enter meeting ID"
          value={roomIdValue}
          changeHandler={handleRoomIdValueChange}
        />
      )}
      <Input
        placeholder="Enter your Name"
        value={nameValue}
        changeHandler={handleNameValueChange}
      />
    </div>
  );
};

export default JoinRoomInputs;
