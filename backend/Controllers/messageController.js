//  Message controllers for creating and fetching all messages.
import Message from "../Models/Message.js";
import User from "../Models/UserModel.js";
import Chat from "../Models/ChatModel.js";

const fetchMessage = async (req, res, next) => {
  const currUser = req.user;
  const { chatId } = req.params;

  if(!currUser||!chatId) return res.status(400).json({message:"Bad Request!"});

  const message = await Message.find({ chat: chatId })
    .populate("sender", "name email profilePic")
    .populate("chat");
    return res.status(200).json(message);
};

const sendMessage = async (req, res, next) => {
    const currUser=req.user;
    const { chatId, content } = req.body;

    if(!currUser||!chatId || !content) return res.status(400).json({message:"Bad Request!"});
    
    // New Message
    const data={sender:currUser._id,content,chat:chatId};
    let message=new Message(data);
    await message.save();
    message = await message.populate("sender", "name profilePic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name profilePic email",
    });
    
    //Update Chat's last message.
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message });
    return res.status(200).json(message);
};

export { fetchMessage, sendMessage };
