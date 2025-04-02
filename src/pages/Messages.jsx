import { useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuthState } from "../components/firebase";
import { db } from "../components/firebase";
import "./Messages.css";

const getConversationId = (email1, email2) => {
  return [email1, email2].sort().join("_"); // ensures uniqueness
};

const Messages = () => {
  const [currentUser] = useAuthState();
  const [users, setUsers] = useState({ owners: [], sitters: [] });
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Fetch all profiles from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "profiles"));
      const owners = [];
      const sitters = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        const email = doc.id;

        if (email === currentUser?.email) return; // skip self

        const userObj = {
          email,
          name: `${data.first} ${data.last}`,
          role: data.role,
        };

        if (data.role === "Owner") owners.push(userObj);
        else sitters.push(userObj);
      });

      setUsers({ owners, sitters });
    };

    if (currentUser) fetchUsers();
  }, [currentUser]);

  // Fetch live messages for selected user
  useEffect(() => {
    if (!selectedUser || !currentUser) return;

    const convoId = getConversationId(currentUser.email, selectedUser.email);

    const q = query(
      collection(db, "conversations", convoId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [selectedUser, currentUser]);

  const handleSend = async () => {
    if (!input.trim() || !selectedUser || !currentUser) return;

    const convoId = getConversationId(currentUser.email, selectedUser.email);

    await addDoc(collection(db, "conversations", convoId, "messages"), {
      sender: currentUser.email,
      text: input,
      timestamp: new Date(),
    });

    setInput("");
  };

  return (
    <div className="messages-container">
      <div className="conversations-list">
        <h3>Messages</h3>

        <div className="user-category">
          <h4>Pet Owners</h4>
          {users.owners.map((user) => (
            <div
              key={user.email}
              className={`chat-item ${selectedUser?.email === user.email ? "active" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>

        <div className="user-category">
          <h4>Pet Sitters</h4>
          {users.sitters.map((user) => (
            <div
              key={user.email}
              className={`chat-item ${selectedUser?.email === user.email ? "active" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              {user.name}
            </div>
          ))}
        </div>
      </div>

      <div className="chat-window">
        {selectedUser ? (
          <>
            <h3>Chat with {selectedUser.name}</h3>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === currentUser.email ? "sent" : "received"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </>
        ) : (
          <p className="no-chat-selected">Select a user to start chatting</p>
        )}
      </div>
    </div>
  );
};

export default Messages;