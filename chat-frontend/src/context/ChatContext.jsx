import React, { createContext, useState, useEffect, useContext, useRef } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";
import API from "../services/api";
import toast from "react-hot-toast";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState({});
  const socketRef = useRef(null);

  // Keep selectedUser state in a ref to use inside socket event listeners
  const selectedUserRef = useRef(null);
  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  // Fetch all registered users
  const fetchUsers = async () => {
    if (!user) return;
    try {
      const response = await API.get("/auth/users");
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load contacts list.");
    }
  };

  // Fetch messages for a specific conversation
  const fetchMessages = async (otherUserId) => {
    try {
      const response = await API.get(`/message/getAll/${otherUserId}`);
      setMessages(response.data.messages || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
      toast.error("Failed to load message history.");
    }
  };

  // Select user and load messages
  const selectUser = (contact) => {
    setSelectedUser(contact);
    if (contact) {
      fetchMessages(contact._id);
    } else {
      setMessages([]);
    }
  };

  // Send a text message
  const sendMessage = async (text) => {
    if (!selectedUser || !text.trim()) return;
    try {
      const response = await API.post(`/message/sendMessage/${selectedUser._id}`, { text });
      const { newMessage } = response.data;
      setMessages((prev) => [...prev, newMessage]);
      // The backend handles sending socket events to the receiver,
      // but we update our own UI state locally.
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message.");
    }
  };

  // Upload and send image or video
  const sendMedia = async (file, type) => {
    if (!selectedUser) return;
    const formData = new FormData();
    formData.append(type, file); // 'image' or 'video'

    try {
      let response;
      if (type === "image") {
        response = await API.post(`/message/send-image/${selectedUser._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await API.post(`/message/send-video/${selectedUser._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      
      const newMsg = response.data.data;
      setMessages((prev) => [...prev, newMsg]);
      toast.success(`${type === "image" ? "Image" : "Video"} sent successfully!`);
    } catch (error) {
      console.error(`Error sending ${type}:`, error);
      toast.error(`Failed to send ${type}.`);
    }
  };

  // Typing state emitters
  const sendTypingStart = () => {
    if (socketRef.current && selectedUser && user) {
      socketRef.current.emit("typing-start", {
        senderId: user.userId,
        receiverId: selectedUser._id,
      });
    }
  };

  const sendTypingStop = () => {
    if (socketRef.current && selectedUser && user) {
      socketRef.current.emit("typing-stop", {
        senderId: user.userId,
        receiverId: selectedUser._id,
      });
    }
  };

  // Socket Lifecycle
  useEffect(() => {
    if (user) {
      fetchUsers();

      // Initialize Socket connection
      const socketUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      const socket = io(socketUrl, {
        transports: ["websocket"],
      });
      socketRef.current = socket;

      // Join socket room
      socket.emit("join", user.userId);

      // Listeners
      socket.on("online-users", (userIds) => {
        setOnlineUsers(userIds || []);
      });

      socket.on("receive-message", (newMessage) => {
        // Only append to screen if message sender is the selected user
        // OR if the message is from current user (though current user adds it via API response)
        const activeUser = selectedUserRef.current;
        if (activeUser && (newMessage.senderId === activeUser._id || newMessage.receiverId === activeUser._id)) {
          setMessages((prev) => [...prev, newMessage]);
          // Mark as seen
          API.patch(`/message/seen/${newMessage._id}`).catch((err) => console.error("Mark seen error", err));
        } else {
          // Message is from someone else, show alert / update sidebar list
          toast((t) => (
            <span>
              New message from <b>{newMessage.senderId}</b>
            </span>
          ));
        }
      });

      socket.on("user-typing", (senderId) => {
        setTypingUsers((prev) => ({ ...prev, [senderId]: true }));
      });

      socket.on("user-stop-typing", (senderId) => {
        setTypingUsers((prev) => ({ ...prev, [senderId]: false }));
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    } else {
      setUsers([]);
      setSelectedUser(null);
      setMessages([]);
      setOnlineUsers([]);
      setTypingUsers({});
    }
  }, [user]);

  return (
    <ChatContext.Provider
      value={{
        users,
        selectedUser,
        messages,
        onlineUsers,
        typingUsers,
        selectUser,
        sendMessage,
        sendMedia,
        sendTypingStart,
        sendTypingStop,
        fetchUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
