import express from 'express';
import { requireAuth, attachUserData } from '../middlewares/clerkAuth.js';
import { getConversations, getMessages, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

// Get all conversations for a user
router.get('/conversations', requireAuth, attachUserData, getConversations);

// Get all messages for a chat
router.get('/:chatId', requireAuth, attachUserData, getMessages);

// Send a new message
router.post('/', requireAuth, attachUserData, sendMessage);

export default router; 