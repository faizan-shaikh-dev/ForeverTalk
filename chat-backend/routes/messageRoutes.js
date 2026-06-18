import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getMessages, markAsSeen, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/sendMessage/:receiverId", protect, sendMessage);
router.get("/getAll/:userId",protect,getMessages);
router.patch("/seen/:messageId",protect, markAsSeen)

export default router;