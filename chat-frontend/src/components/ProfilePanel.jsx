import React from "react";
import { Mail, Phone, ImageIcon, FileText } from "lucide-react";
import { useChat } from "../context/ChatContext";

const ProfilePanel = () => {
  const { selectedUser, messages, onlineUsers } = useChat();
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  if (!selectedUser) return null;

  // Dynamically extract all shared media messages from the chat log
  const sharedMedia = messages.filter(
    (msg) => msg.messageType === "image" || msg.messageType === "video"
  );

  return (
    <div className="h-full bg-slate-950 text-white p-6 overflow-y-auto flex flex-col border-l border-slate-800/80">

      {/* Profile Info Header */}
      <div className="flex flex-col items-center py-4">
        <div className="w-24 h-24 rounded-3xl bg-slate-900 border-2 border-slate-800 flex items-center justify-center font-bold text-3xl text-blue-400 shadow-xl shadow-blue-500/5">
          {selectedUser.username.substring(0, 2).toUpperCase()}
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-100">
          {selectedUser.username}
        </h2>

        <p className={`text-xs mt-1 font-medium ${isOnline ? "text-green-400" : "text-slate-500"}`}>
          ● {isOnline ? "Online" : "Offline"}
        </p>

        <p className="text-slate-500 text-center mt-3 text-xs leading-relaxed max-w-[200px]">
          ForeverTalk user. Enjoy secure, real-time communications! 🚀
        </p>
      </div>

      {/* Contact Details */}
      <div className="mt-6 space-y-3">
        <div className="bg-slate-900/60 border border-slate-800/50 p-3.5 rounded-2xl flex items-center gap-3">
          <Mail size={16} className="text-blue-400" />
          <div className="overflow-hidden">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Email Address</p>
            <p className="text-xs truncate text-slate-300">
              {selectedUser.username.toLowerCase()}@forevertalk.com
            </p>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800/50 p-3.5 rounded-2xl flex items-center gap-3">
          <Phone size={16} className="text-blue-400" />
          <div className="overflow-hidden">
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Calling Status</p>
            <p className="text-xs text-slate-300">
              {isOnline ? "Available for calls" : "Unavailable"}
            </p>
          </div>
        </div>
      </div>

      {/* Shared Media log */}
      <div className="mt-8 flex-1">
        <div className="flex items-center gap-2 mb-4">
          <ImageIcon size={16} className="text-blue-400" />
          <h3 className="font-semibold text-sm text-slate-200">
            Shared Media ({sharedMedia.length})
          </h3>
        </div>

        {sharedMedia.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-800 rounded-2xl text-slate-600 text-xs text-center">
            <ImageIcon size={28} className="mb-2 opacity-30" />
            No shared photos or videos
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
            {sharedMedia.map((msg) => (
              <div key={msg._id} className="relative aspect-square rounded-lg bg-slate-900 overflow-hidden border border-slate-800">
                {msg.messageType === "image" ? (
                  <a href={msg.mediaUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={msg.mediaUrl}
                      alt="shared"
                      className="w-full h-full object-cover hover:scale-105 transition duration-200"
                    />
                  </a>
                ) : (
                  <video
                    src={msg.mediaUrl}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePanel;