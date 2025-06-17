import React from "react";
import styled from "styled-components";

const InputChat = ({ newMsg, setNewMsg, sendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMsg.trim() !== "") {
      sendMessage();
    }
  };
  return (
    <StyledWrapper>
      <div className="messageBox">
        <input
          required
          placeholder="Type a message..."
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={handleKeyPress}
          type="text"
          id="messageInput"
        />
        <button id="sendButton" onClick={sendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 664 663"
          >
            <path
              fill="none"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            />
            <path
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="33.67"
              stroke="#6c6c6c"
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
            />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .messageBox {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: #2d2d2d;
    background-color: #ffffff;
    padding: 5px 15px 5px 5px;
    border-radius: 10px;
    border: 1px solid rgb(69, 69, 69);
  }
  .messageBox:focus-within {
    border: 1px solid rgb(110, 110, 110);
  }
  #messageInput {
    width: 50vw;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    padding-left: 5px;
    color: black;
    font-size: 18px;
  }
//   #messageInput:focus ~ #sendButton svg path,
//   #messageInput:valid ~ #sendButton svg path {
//     fill: #3c3c3c;
//     stroke: white;
//   }

  #sendButton {
    width: fit-content;
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
  }
  #sendButton svg {
    height: 35px;
    transition: all 0.3s;
    stroke: gray;
  }
  #sendButton svg path {
    transition: all 0.3s;
  }
  #sendButton:hover svg path {
    fill: #3b66ff;
    stroke: #4ade80;
  }
`;

export default InputChat;
