import React from "react";

const MessageBubble = ({ message, isSender, mediaUrl, messageType, createdAt }) => {
  const formatTime = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return "";
    }
  };

  return (
    <div className={`flex ${isSender ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${
          isSender
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-slate-900 border border-slate-800/80 text-slate-100 rounded-bl-md"
        }`}
      >
        {/* Render different message types */}
        {messageType === "image" && mediaUrl && (
          <div className="mb-2 overflow-hidden rounded-xl">
            <img
              src={mediaUrl}
              alt="Sent image"
              className="max-w-full rounded-xl object-contain max-h-[300px] hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}

        {messageType === "video" && mediaUrl && (
          <div className="mb-2 overflow-hidden rounded-xl max-w-full">
            <video
              src={mediaUrl}
              className="max-h-[300px] w-full rounded-xl"
              controls
            />
          </div>
        )}

        {message && <p className="text-sm whitespace-pre-wrap break-words">{message}</p>}

        <p className={`text-[10px] mt-1 text-right block ${isSender ? "text-blue-200" : "text-slate-500"}`}>
          {formatTime(createdAt)}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;