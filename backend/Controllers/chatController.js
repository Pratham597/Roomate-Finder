//  Controllers for creating and fetching all chats associated with user.
import Chat from "../Models/ChatModel.js";
import User from "../Models/UserModel.js";
import Message from "../Models/ChatModel.js";

const fetchChat = async (req, res, next) => {
  const currUser = req.user; // Logged User Info.

  if (!currUser) return res.status(400).json({ message: "User not found!" });

  const chats = await Chat.find({ users: { $elemMatch: { $eq: currUser._id } } })
    .populate("users", "-password")
    .populate({
      path: "latestMessage",
      populate: { path: "sender", select: "name profilePic email" },
    });

  return res.status(200).json(chats);
};

const createChat = async (req, res, next) => {
  const currUser = req.user; // Logged User Info.
  if (!currUser) return res.status(400).json({ message: "User not found!" });

  const { userId } = req.body; // Other User Id.
  if (!userId) {
    return res.status(403).json({ message: "User id not found!" });
  }
  // Check whether chat exists or not.
  const chat = await Chat.findOne({
    $and: [
      { users: { $elemMatch: { $eq: currUser._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  });

  if (chat) return res.json(chat);
  else {
    let newchat = new Chat({
      users: [currUser._id, userId],
    });
    await newchat.save();
    newchat = await Chat.findById(newchat._id).populate("users", "-password");
    return res.status(200).json(newchat);
  }
};

export { fetchChat, createChat };
