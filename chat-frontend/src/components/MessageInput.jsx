import React, { useState, useRef } from "react";
import { Send, Image, Paperclip, X, Loader2 } from "lucide-react";
import { useChat } from "../context/ChatContext";

const MessageInput = () => {
  const { sendMessage, sendMedia, sendTypingStart, sendTypingStop } = useChat();
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleTextChange = (e) => {
    setText(e.target.value);

    if (!isTyping && e.target.value.trim() !== "") {
      setIsTyping(true);
      sendTypingStart();
    }

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      sendTypingStop();
    }, 2000);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setAttachment(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearAttachment = () => {
    setAttachment(null);
    setPreviewUrl("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return;

    if (attachment) {
      const type = attachment.type.startsWith("image") ? "image" : "video";
      setUploading(true);
      await sendMedia(attachment, type);
      setUploading(false);
      clearAttachment();
    } else if (text.trim()) {
      await sendMessage(text);
      setText("");
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      setIsTyping(false);
      sendTypingStop();
    }
  };

  return (
    <div className="p-4 border-t border-slate-800/80 bg-slate-950/80">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* File Preview */}
        {previewUrl && (
          <div className="relative inline-block bg-slate-900 border border-slate-800 p-2 rounded-2xl">
            {attachment?.type.startsWith("image") ? (
              <img
                src={previewUrl}
                alt="Upload preview"
                className="max-h-24 rounded-xl object-cover"
              />
            ) : (
              <video
                src={previewUrl}
                className="max-h-24 rounded-xl"
                controls
              />
            )}
            <button
              type="button"
              onClick={clearAttachment}
              className="absolute -top-2 -right-2 p-1.5 bg-slate-800 border border-slate-700 text-white rounded-full hover:bg-slate-700 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>
        )}

        <div className="flex gap-3 items-center">
          {/* File Input Triggers */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*,video/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-xl hover:bg-slate-900/60 transition cursor-pointer"
          >
            <Paperclip size={18} />
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={text}
            onChange={handleTextChange}
            disabled={!!attachment || uploading}
            placeholder={attachment ? "Press Send to upload media..." : "Type a message..."}
            className="flex-1 bg-slate-900 border border-slate-800 focus:border-blue-500/50 text-white rounded-xl px-4 py-3 outline-none text-sm placeholder-slate-500 transition-colors"
          />

          {/* Submit button */}
          <button
            type="submit"
            disabled={(!text.trim() && !attachment) || uploading}
            className="bg-blue-600 p-3 rounded-xl hover:bg-blue-700 disabled:bg-slate-900 border disabled:border-slate-800 disabled:text-slate-600 text-white transition flex items-center justify-center cursor-pointer min-w-[44px]"
          >
            {uploading ? (
              <Loader2 className="animate-spin text-blue-500" size={18} />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;