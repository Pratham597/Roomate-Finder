import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      trim: true,
      default:"Finder"
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", chatSchema);
export default Chat;
