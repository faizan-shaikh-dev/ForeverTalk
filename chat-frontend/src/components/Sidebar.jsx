import React, { useState } from "react";
import { Search, LogOut, MessageSquare } from "lucide-react";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { users, selectedUser, selectUser, onlineUsers } = useChat();
  const { user, logout } = useAuth();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-full bg-slate-950 text-white flex flex-col border-r border-slate-800/80">
      
      {/* Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-blue-500" size={24} />
          <h1 className="text-xl font-bold bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
            ForeverTalk
          </h1>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="flex items-center bg-slate-900 border border-slate-800 focus-within:border-blue-500/50 rounded-2xl px-3 transition-all duration-300">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contacts..."
            className="w-full bg-transparent p-3 outline-none text-sm placeholder-slate-500"
          />
        </div>
      </div>

      {/* Users List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-slate-500 text-sm py-8">
            No contacts found
          </div>
        ) : (
          filteredUsers.map((u) => {
            const isOnline = onlineUsers.includes(u._id);
            const isSelected = selectedUser && selectedUser._id === u._id;
            return (
              <div
                key={u._id}
                onClick={() => selectUser(u)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10"
                    : "hover:bg-slate-900/60 text-slate-300 hover:text-white"
                }`}
              >
                <div className="relative shrink-0">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-blue-400"
                  }`}>
                    {u.username.substring(0, 2).toUpperCase()}
                  </div>

                  {isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-950"></span>
                  )}
                </div>

                <div className="flex-1 overflow-hidden">
                  <h3 className="font-medium text-sm truncate">
                    {u.username}
                  </h3>
                  <p className={`text-xs truncate ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                    {isOnline ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* User Profile Footer */}
      {user && (
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/30 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center font-semibold text-sm">
              {user.username.substring(0, 2).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="font-semibold text-sm truncate text-slate-200">{user.username}</p>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">Logged In</p>
            </div>
          </div>

          <button
            onClick={logout}
            title="Logout"
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-slate-900/80 rounded-xl transition-all cursor-pointer"
          >
            <LogOut size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;