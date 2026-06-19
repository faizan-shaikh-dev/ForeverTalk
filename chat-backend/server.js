import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js"
import {createServer} from "http";
import { Server } from "socket.io";
import { setUpSocket } from "./socket/socket.js";
import path from "path"
const app = express();
dotenv.config();

const allowedOrigins = [
  "http://localhost:5173",
  "https://forever-talk.vercel.app",
  "https://forevertalk.onrender.com"
];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());
app.use("/uploads", express.static("upload"));
app.use("/upload", express.static("upload"));

connectDB();

app.get("/",(req, res)=>{
    res.send("ForeverTalk")
});

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

//HTTP Server
const server = createServer(app);

//Socket Server
const io = new Server(server, {
    cors:{
        origin: allowedOrigins,
        credentials:true
    },
});

//setUpSocket

setUpSocket(io)

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});
