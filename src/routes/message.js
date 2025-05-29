import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { protect } from '../middlewares/auth.js';
import {
  sendMessage,
  getMessagesByChat,
  markMessageAsRead
} from '../controllers/messageController.js';

const router = express.Router();

router.use(protect);

// Send a message
router.post(
  '/',
  validate([
    body('chatId').notEmpty(),
    body('receiverId').notEmpty(),
    body('text').optional().isString(),
    body('attachments').optional().isArray()
  ]),
  sendMessage
);

// Get messages in a chat
router.get('/:chatId', getMessagesByChat);

// Mark a message as read
router.patch('/:id/read', markMessageAsRead);

export default router;