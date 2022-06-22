import { TextField, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import { useContext } from "../../hooks/context/GlobalContext";
import { sendMessagesUsingDataChannel } from "../../utils/twilioUtils";
import SendIcon from "@mui/icons-material/Send";

const NewMessage = () => {
  const [message, setMessage] = useState("");
  const { state, dispatch } = useContext();

  const sendMessage = () => {
    let newMessage = sendMessagesUsingDataChannel(
      message,
      true,
      state?.identity,
      state?.messages,
      state?.setMessages
    );

    let newMessages = [...state?.messages];
    newMessages.push(newMessage);
    dispatch({ type: "SET_MESSAGES", payload: { messages: newMessages } });

    setMessage("");
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //sendMessage To other user
      sendMessage();
    }
  };

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <TextField
      className="new_message_input"
      value={message}
      onChange={handleTextChange}
      label="Type your message..."
      type="text"
      onKeyDown={handleKeyPressed}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <SendIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default NewMessage;
