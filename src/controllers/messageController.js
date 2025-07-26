import Message from '../models/message.js';
import User from '../models/user.js';
import { extractUserIdsFromChatId } from '../utils/chatHelpers.js';

// Get all conversations for a user
export async function getConversations(req, res) {
  try {
    const userId = req.user._id;
    
    // Find all messages where user is sender or receiver
    const messages = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      },
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: "$chatId",
          lastMessage: { $first: "$text" },
          lastMessageTime: { $first: "$timestamp" },
          senderId: { $first: "$senderId" },
          receiverId: { $first: "$receiverId" }
        }
      }
    ]);

    console.log('Found messages for conversations:', messages);

    // Get conversation partners info
    const conversations = await Promise.all(messages.map(async (msg) => {
      let partnerId = null;
      
      // Try to get partner ID from senderId/receiverId
      if (msg.receiverId) {
        partnerId = msg.senderId.equals(userId) ? msg.receiverId : msg.senderId;
      } else {
        // Fallback: extract partner ID from chat ID
        console.log('receiverId is null, extracting from chatId:', msg._id);
        const userIds = extractUserIdsFromChatId(msg._id);
        if (userIds) {
          partnerId = userIds.find(id => id !== userId.toString());
        }
      }
      
      console.log('Looking for partner with ID:', partnerId);
      console.log('Current user ID:', userId);
      
      let partner = null;
      if (partnerId) {
        partner = await User.findById(partnerId).select('name profilePicUrl');
        console.log('Found partner:', partner);
        
        // If partner not found by _id, try finding by clerkId
        if (!partner) {
          partner = await User.findOne({ clerkId: partnerId }).select('name profilePicUrl');
          console.log('Found partner by clerkId:', partner);
        }
      }
      
      // Fallback if still not found
      if (!partner) {
        partner = { name: 'Unknown User', profilePicUrl: null };
        console.log('Using fallback partner info');
      }
      
      return {
        _id: msg._id,
        partner,
        lastMessage: msg.lastMessage,
        lastMessageTime: msg.lastMessageTime
      };
    }));

    res.json(conversations);
  } catch (err) {
    console.error('Error fetching conversations:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Fetch all messages for a chat (conversation)
export async function getMessages(req, res) {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId })
      .populate('senderId', 'name profilePicUrl')
      .populate('receiverId', 'name profilePicUrl')
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
}

// Send (create) a new message
export async function sendMessage(req, res) {
  try {
    const { chatId, text, receiverId } = req.body;
    const senderId = req.user._id;
    
    const message = await Message.create({
      chatId,
      senderId,
      receiverId,
      text,
      timestamp: new Date(),
    });

    // Populate sender info for the response
    const populatedMessage = await Message.findById(message._id)
      .populate('senderId', 'name profilePicUrl')
      .populate('receiverId', 'name profilePicUrl');

    // Emit the message via Socket.IO to all clients in the chat room
    const io = req.app.get('io');
    if (io) {
      io.to(chatId).emit('receive_message', {
        ...populatedMessage.toJSON(),
        chatId,
      });
    }

    res.status(201).json(populatedMessage);
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Server error' });
  }
} 