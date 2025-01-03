import React, { useState, useEffect } from "react";
import axios from "axios";

const ChatWindow = ({ chat }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/message/${chat._id}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [chat]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post("http://localhost:5000/api/message", {
        chat: chat._id,
        content: newMessage,
      });
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleMarkAsRoommate = () => {
    alert(`${chat.chatName} has been marked as a roommate.`);
  };

  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-gray-100 shadow-xl flex flex-col">
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{chat.chatName}</h2>
        <button
          onClick={handleMarkAsRoommate}
          className="bg-green-500 px-4 py-2 rounded text-sm"
        >
          Mark As Roommate
        </button>
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {messages.map((message) => (
          <div key={message._id} className="mb-4">
            <p className="text-sm font-semibold">{message.sender}</p>
            <p className="text-base bg-white p-2 rounded shadow">{message.content}</p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-200 flex items-center">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
