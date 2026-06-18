import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

const app = express();
dotenv.config();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

connectDB();

app.get("/",(req, res)=>{
    res.send("ForeverTalk")
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`);
});
