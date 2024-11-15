import { Conversation, Message } from '../models/conversation.models.js';
import { User } from '../models/user.models.js';
import { getReceiverSocketId, io} from '../socket/socket.js';
import Notification from '../models/notification.models.js';


export const sendMessage = async (req, res) => {
  try{
    const { message } = req.body;
    const { id : receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({ participants : { $all : [senderId, receiverId] } });

    if(!conversation){
      conversation = await Conversation.create({ participants : [senderId, receiverId] });
    }
    const newMessage = new Message({ senderId, receiverId, message });
    if(newMessage){
      conversation.messages.push(newMessage._id)
    }
    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverId).emit('newMessage', newMessage)
    }
    res.status(201).json(newMessage);
  }catch(error){
    console.error('Error sending message', error.message);
    res.status(500).json({ message : 'Server error' });
  }
};

export const getMessages = async (req, res) => {
  try{
    const { id : userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({ participants : {$all : [senderId, userToChatId] } }).populate('messages');

    if(!conversation){
      return res.status(200).json([]);
    }
    const messages = conversation.messages;
    res.status(200).json(messages);

  }catch(error){
    console.error('Error getting messages: ', error.message);
    res.status(500).json({ message : 'Server error' });
  }
};

export const getUsersForSideBar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const filteredUsers = await User.find({ _id : { $ne : loggedInUserId } }).select("-password");

    res.status(200).json(filteredUsers);
    
  } catch (error) {
    console.error("Error fetching users : ", error);
    res.status(500).json({ message : "Server error" });
  }
};

export const notify = async (receiverId, message) => {
  try {
    const receiver = await User.findById(receiverId);
    if(!receiver){
      console.log(console.error);
    }
    const notification = new Notification({ destination : receiverId, message : message });
    await notification.save();
    const socketId = getReceiverSocketId(receiverId);
    if(!socketId){
      console.log("user not connected");
    };
    io.to(socketId).emit('notification')
  } catch (error) {
    console.log(error.message);
  };
};

export const getNofications = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId);
    if(!user){
      return res.status(404).json({ message : "Unauthorized" });
    };
    const notifications = await Notification.find({ destination : userId });
    if(notifications.length === 0){
      return res.status(404).json({ message : "No notifications found" })
    };
    return res.status(200).json(notifications)
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message : "Server error" });
  }
}