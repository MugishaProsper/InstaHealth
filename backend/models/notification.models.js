import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  destination : { type : mongoose.Types.ObjectId, ref : 'User'},
  message : { type : String, required : true },
  isRead : { type : Boolean, default : false },
  date : { type : Date, default : Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema)

export default Notification;