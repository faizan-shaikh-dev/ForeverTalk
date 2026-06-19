import React from "react";
import { Phone, Video, MoreVertical, ArrowLeft } from "lucide-react";
import { useChat } from "../context/ChatContext";

const ChatHeader = () => {
  const { selectedUser, selectUser, onlineUsers } = useChat();
  const isOnline = selectedUser && onlineUsers.includes(selectedUser._id);

  if (!selectedUser) return null;

  return (
    <div className="h-20 border-b border-slate-800/80 px-6 flex items-center justify-between bg-slate-950/60 backdrop-blur-md">
      
      <div className="flex items-center gap-3">
        {/* Mobile Back Button */}
        <button
          onClick={() => selectUser(null)}
          className="md:hidden p-2 hover:bg-slate-900 rounded-xl transition text-slate-400 hover:text-white mr-1 cursor-pointer"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="w-11 h-11 rounded-2xl bg-slate-800 border border-slate-700/80 flex items-center justify-center font-bold text-blue-400">
          {selectedUser.username.substring(0, 2).toUpperCase()}
        </div>

        <div>
          <h2 className="text-white font-semibold text-sm">
            {selectedUser.username}
          </h2>

          <p className={`text-xs ${isOnline ? "text-green-400" : "text-slate-500"}`}>
            ● {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-400">
        <Phone
          size={18}
          className="cursor-pointer hover:text-white transition"
        />

        <Video
          size={18}
          className="cursor-pointer hover:text-white transition"
        />

        <MoreVertical
          size={18}
          className="cursor-pointer hover:text-white transition"
        />
      </div>
    </div>
  );
};

export default ChatHeader;