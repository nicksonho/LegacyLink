import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import {
  requireAuth,
  authorize,
  attachUserData
} from '../middlewares/clerkAuth.js';
import {
  getMe,
  getUserById,
  getAllUsers,
  updateMe
} from '../controllers/userController.js';

const router = express.Router();

// All routes below require the user to be authenticated
router.use(requireAuth);
router.use(attachUserData);

//  Get current user's profile
router.get('/me', getMe);

//  Update current user's profile
router.patch(
  '/me',
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

// Admin-only routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin'), getUserById);

export default router;