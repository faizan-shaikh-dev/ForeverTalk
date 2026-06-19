import React, { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import TypingIndicator from "./TypingIndicator";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const ChatContainer = () => {
  const { messages, selectedUser, typingUsers } = useChat();
  const { user } = useAuth();
  const messagesEndRef = useRef(null);

  const isTyping = selectedUser && typingUsers[selectedUser._id];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="h-full flex flex-col bg-slate-950">
      <ChatHeader />

      {/* Messages Log */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm">
            <span>No messages yet. Say hello! 👋</span>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg._id}
              message={msg.text}
              isSender={msg.senderId === user?.userId}
              mediaUrl={msg.mediaUrl}
              messageType={msg.messageType}
              createdAt={msg.createdAt}
            />
          ))
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="py-2">
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;