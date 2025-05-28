import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  chatId: String,
  senderId: mongoose.Schema.Types.ObjectId,
  receiverId: mongoose.Schema.Types.ObjectId,
  text: String,
  timestamp: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false },
  attachments: [String]
});

export default mongoose.model("Message", MessageSchema);