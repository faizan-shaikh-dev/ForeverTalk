import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getMessages,
  markAsSeen,
  sendImageMessage,
  sendVideoMessage,
  sendMessage,
  uploadImage,
  uploadVideo,
} from "../controllers/messageController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/sendMessage/:receiverId", protect, sendMessage);
router.get("/getAll/:userId", protect, getMessages);
router.patch("/seen/:messageId", protect, markAsSeen);
router.post("/upload-image", protect, upload.single("image"), uploadImage);
router.post("/upload-video", protect, upload.single("video"), uploadVideo);
router.post("/send-image/:receiverId", protect, upload.single("image"), sendImageMessage);
router.post("/send-video/:receiverId", protect, upload.single("video"), sendVideoMessage);

export default router;
