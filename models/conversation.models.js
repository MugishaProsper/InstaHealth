import mongoose from "mongoose";

const conversationSchema = mongoose.Schema({
  participants : [ { type : mongoose.Schema.Types.ObjectId, ref : "User" }],
  messages : [{ type : mongoose.Schema.Types.ObjectId, ref : "Message", default : [] }],
  date : { type : Date, default : Date.now }
});

const messageSchema = mongoose.Schema({
  senderId : { type : mongoose.Schema.Types.ObjectId, ref : 'User', required : true },
  receiverId : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  message : { type : String, required : true },
  attachment : { type : Buffer },
  attachmentContentType : { type : String }
}, { timestamps : true });

export const Message = mongoose.model('Message', messageSchema)


export const Conversation = mongoose.model('Conversation', conversationSchema);
