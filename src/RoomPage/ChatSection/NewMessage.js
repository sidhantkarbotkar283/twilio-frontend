import React, { useState } from "react";
import { useContext } from "../../hooks/context/GlobalContext";
import SendMessageButton from "../../resources/images/sendMessageButton.svg";
import { sendMessagesUsingDataChannel } from "../../utils/twilioUtils";

const NewMessage = () => {
  const [message, setMessage] = useState("");
  const { state, dispatch } = useContext();
  const sendMessage = () => {
    console.log(message);
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
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message..."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        onClick={sendMessage}
      />
    </div>
  );
};

export default NewMessage;
