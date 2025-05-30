import Message from '../models/message.js';

// Send a message
export async function sendMessage(req, res) {
  const { chatId, receiverId, text, attachments } = req.body;

  const message = await Message.create({
    chatId,
    senderId: req.user.id,
    receiverId,
    text,
    attachments,
    timestamp: new Date()
  });

  res.status(201).json(message);
}

// Get messages in a chat
export async function getMessagesByChat(req, res) {
  const { chatId } = req.params;

  const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
  res.json(messages);
}

// Mark message as read
export async function markMessageAsRead(req, res) {
  const { id } = req.params;
  const message = await Message.findById(id);

  if (!message) return res.status(404).json({ message: 'Message not found' });
  if (message.receiverId.toString() !== req.user.id) {
    return res.status(403).json({ message: 'Not authorized to mark this message' });
  }

  message.isRead = true;
  await message.save();
  res.json({ message: 'Marked as read' });
}