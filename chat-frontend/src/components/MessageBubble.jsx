const MessageBubble = ({ message, isSender }) => {
  return (
    <div
      className={`flex ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl ${
          isSender
            ? "bg-blue-600 text-white rounded-br-md"
            : "bg-slate-800 text-white rounded-bl-md"
        }`}
      >
        <p>{message}</p>

        <p className="text-xs mt-1 opacity-70 text-right">
          12:45 PM
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;