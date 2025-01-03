import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import ChatWindow from "./ChatWindow";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/chat");
        setChats(response.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    fetchChats();
  }, []);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 bg-white p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-[#367896] mt-12 mb-3">Chats</h1>
        <div className="space-y-6">
          {chats.length > 0 ? (
            chats.map((chat) => (
              <div
                key={chat._id}
                className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between transition-transform transform hover:scale-105 cursor-pointer"
                onClick={() => handleChatClick(chat)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0">
                    <img
                      src="/default-avatar.png"
                      alt={chat.chatName}
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <div className="ml-4">
                    <h2 className="text-xl font-semibold text-[#367896]">
                      {chat.chatName}
                    </h2>
                    <p className="text-sm text-gray-400">
                      {chat.latestMessage?.content || "No messages yet."}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {chat.latestMessage?.createdAt
                    ? formatDistanceToNow(new Date(chat.latestMessage.createdAt), {
                        addSuffix: true,
                      })
                    : ""}
                </p>
              </div>
            ))
          ) : (
            <p className="text-[#B2BABE]">No chats available</p>
          )}
        </div>
      </div>

      {selectedChat && <ChatWindow chat={selectedChat} />}
    </div>
  );
};

export default Chat;
