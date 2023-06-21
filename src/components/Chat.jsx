import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { FaCameraRetro, FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <FaCameraRetro className="w-8 h-8"></FaCameraRetro>
          <FaPlusCircle className="w-8 h-8"></FaPlusCircle>
          <FaPlusSquare className="w-8 h-8"></FaPlusSquare>
        </div>
      </div>
      <Messages />
      <Input/>
    </div>
  );
};

export default Chat;