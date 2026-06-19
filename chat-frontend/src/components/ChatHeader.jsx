import {
  Phone,
  Video,
  MoreVertical,
} from "lucide-react";

const ChatHeader = () => {
  return (
    <div className="h-20 border-b border-slate-800 px-6 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/150?img=1"
          alt=""
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h2 className="text-white font-semibold">
            Rahul Sharma
          </h2>

          <p className="text-sm text-green-400">
            Online
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 text-slate-400">
        <Phone
          size={20}
          className="cursor-pointer hover:text-white"
        />

        <Video
          size={20}
          className="cursor-pointer hover:text-white"
        />

        <MoreVertical
          size={20}
          className="cursor-pointer hover:text-white"
        />
      </div>
    </div>
  );
};

export default ChatHeader;