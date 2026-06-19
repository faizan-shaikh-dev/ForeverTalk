import ChatHeader from "./ChatHeader";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";

const messages = [
  {
    id: 1,
    text: "Hello bro 👋",
    sender: false,
  },
  {
    id: 2,
    text: "Kaise ho?",
    sender: false,
  },
  {
    id: 3,
    text: "Main theek hu 🚀",
    sender: true,
  },
];

const ChatContainer = () => {
  return (
    <div className="h-full flex flex-col">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg.text}
            isSender={msg.sender}
          />
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;