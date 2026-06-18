import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    receviedId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    messageType: {
      type: String,
      enum: ["text", "image", "video"],
      default: "text",
    },

    text: {
      type: String,
      default: "",
    },

    mediaUrl: {
      type: String,
      default: "",
    },

    isRead: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

module.exports = mongoose.model("Message", messageSchema);