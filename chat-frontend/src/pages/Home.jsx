import React from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import ProfilePanel from "../components/ProfilePanel";
import { useChat } from "../context/ChatContext";
import { MessageCircleMore } from "lucide-react";

const Home = () => {
  const { selectedUser } = useChat();

  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${selectedUser ? "hidden md:block" : "w-full"} md:w-80 border-r border-slate-800 shrink-0`}>
        <Sidebar />
      </div>

      {/* Chat Area / Welcome Panel */}
      <div className={`${!selectedUser ? "hidden md:flex" : "flex"} flex-1 flex-col bg-slate-950`}>
        {selectedUser ? (
          <ChatContainer />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-slate-950">
            <div className="bg-blue-600/10 p-6 rounded-3xl mb-6 animate-pulse">
              <MessageCircleMore size={64} className="text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to ForeverTalk</h2>
            <p className="text-slate-400 max-w-sm">
              Select a friend from the sidebar to start a real-time conversation.
            </p>
          </div>
        )}
      </div>

      {/* Profile Panel */}
      {selectedUser && (
        <div className="hidden lg:block w-80 border-l border-slate-800 shrink-0">
          <ProfilePanel />
        </div>
      )}
    </div>
  );
};

export default Home;
