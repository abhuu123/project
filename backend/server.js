import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const MessageSchema = new mongoose.Schema({
  name: String,
  message: String
});

const Message = mongoose.model("Message", MessageSchema);

app.post("/api/messages", async (req, res) => {
  const { name, message } = req.body;
  const newMsg = new Message({ name, message });
  await newMsg.save();
  res.status(201).send(newMsg);
});

app.get("/api/messages", async (req, res) => {
  const messages = await Message.find();
  res.json(messages);
});

app.listen(5000, () => console.log("Backend running on port 5000"));

