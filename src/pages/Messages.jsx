import { useState } from "react";
import "./Messages.css";

const Messages = () => {
  const conversations = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
  ];

  // Hardcoded chat messages
  const messagesData = {
    1: [
      { sender: "Alice", text: "Hey! How are you?" },
      { sender: "You", text: "I'm good, thanks! How about you?" },
      { sender: "Alice", text: "I'm good too! What are your plans this evening?" },
      { sender: "You", text: "Just taking my dog for a walk." },
    ],
    2: [
      { sender: "Bob", text: "Are you free this weekend?" },
      { sender: "You", text: "Not sure yet, why?" },
    ],
    3: [
      { sender: "Charlie", text: "Let's catch up soon!" },
      { sender: "You", text: "Sounds great! When are you free?" },
    ],
  };

  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="messages-container">
      {/* Left panel - List of conversations */}
      <div className="conversations-list">
        <h3>Messages</h3>
        {conversations.map((chat) => (
          <div
            key={chat.id}
            className={`chat-item ${selectedChat === chat.id ? "active" : ""}`}
            onClick={() => setSelectedChat(chat.id)}
          >
            {chat.name}
          </div>
        ))}
      </div>

      {/* Right panel - Chat window */}
      <div className="chat-window">
        {selectedChat ? (
          <>
            <h3>{conversations.find((c) => c.id === selectedChat).name}</h3>
            <div className="chat-messages">
              {messagesData[selectedChat].map((msg, index) => (
                <div key={index} className={`chat-message ${msg.sender === "You" ? "sent" : "received"}`}>
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            {/* Message Input Area */}
            <div className="message-input">
              <input type="text" placeholder="Type a message..." />
              <button>Send</button>
            </div>
          </>
        ) : (
          <p className="no-chat-selected">Select a conversation to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Messages;