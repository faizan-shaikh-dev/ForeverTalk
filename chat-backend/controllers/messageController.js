import Message from "../models/messageModel.js";
import { getIO, onlineUsers } from "../socket/socket.js";

//Send Message Logic
export const sendMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const { text } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({
        message: "Message cannot be empty",
      });
    }
    const newMessage = await Message.create({
      senderId: req.user.userId,
      receiverId,
      text,
      messageType: "text",
    });

    const receiverSocketId = onlineUsers.get(receiverId);

    if (receiverSockedId) {
      getIO().to(receiverSockedId).emit("receive-message", newMessage);
    }

    return res.status(200).json({ message: "message sent", newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get Message Logic

export const getMessages = async (req, res) => {
  try {
    const otherUserId = req.params.userId;

    const messages = await Message.find({
      $or: [
        {
          senderId: req.user.userId,
          receiverId: otherUserId,
        },

        {
          senderId: otherUserId,
          receiverId: req.user.userId,
        },
      ],
    }).sort({ createdAt: 1 });
    return res.status(200).json({ messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//marka Seen Logic

export const markAsSeen = async (req, res) => {
  try {
    const { messageId } = req.params;

    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        isRead: true,
      },
      {
        new: true,
      },
    );

    return res.status(200).json({
      message: "Message marked as seen",
      data: message,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

//uploadImage Logic
export const uploadImage = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ imageUrl: `http://localhost:5000/${req.file.path}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Upload Video Logic
export const uploadVideo = async (req, res) => {
  try {
    return res.status(200).json({
      videoUrl: `http://localhost:5000/${req.file.path}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//imageMessage Controller
export const sendImageMessage = async (req, res) => {
  try {
    const { receiverId } = req.params;

    const imageUrl = `http://localhost:5000/${req.file.path}`;

    const newImgMessage = await Message.create({
      senderId: req.user.userId,
      receiverId,
      messageType: "image",
      mediaUrl: imageUrl,
    });

    const receiverSockedId = onlineUsers.get(receiverId);
    if (receiverSockedId) {
      getIO().to(receiverSockedId).emit("recive-message", newImgMessage);
    }

    return res.status(200).json({
      message: "Image sent",
      data: newMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
