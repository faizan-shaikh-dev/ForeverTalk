import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import ProfilePanel from "../components/ProfilePanel";

const Home = () => {
  return (
    <div className="h-screen bg-slate-950 flex overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:block w-80 border-r border-slate-800">
        <Sidebar />
      </div>

      {/* Chat Area */}
      <div className="flex-1">
        <ChatContainer />
      </div>

      {/* Profile Panel */}
      <div className="hidden lg:block w-80 border-l border-slate-800">
        <ProfilePanel />
      </div>
    </div>
  );
};

export default Home;