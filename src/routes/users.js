import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { requireAuth, authorize, attachUserData } from '../middlewares/clerkAuth.js';
import {
  getMe,
  getUserById,
  getAllUsers,
  updateMe
} from '../controllers/userController.js';

const router = express.Router();

// All routes require authentication
router.use(requireAuth);
router.use(attachUserData);

// Get current user profile
router.get('/me', getMe);

// Update current user profile
router.patch('/me', 
  validate([
    body('name').optional(),
    body('yearOfStudy').optional().isInt({ min: 1, max: 6 }),
    body('course').optional(),
    body('interests').optional().isArray(),
    body('bio').optional(),
    body('profilePicUrl').optional().isURL()
  ]),
  updateMe
);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin'), getUserById);

export default router;