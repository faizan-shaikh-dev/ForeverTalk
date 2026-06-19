import { Send } from "lucide-react";

const MessageInput = () => {
  return (
    <div className="p-4 border-t border-slate-800">
      <div className="flex gap-3">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 bg-slate-800 text-white rounded-xl px-4 py-3 outline-none"
        />

        <button className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700">
          <Send className="text-white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;