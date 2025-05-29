import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { protect } from '../middlewares/auth.js';
import {
  getNotifications,
  markNotificationAsRead
} from '../controllers/notificationController.js';

const router = express.Router();

router.use(protect);

// Get all notifications for logged-in user
router.get('/', getNotifications);

// Mark notification as read
router.patch('/:id/read', markNotificationAsRead);

export default router;