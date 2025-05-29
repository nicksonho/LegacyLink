import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { protect, authorize } from '../middlewares/auth.js';
import {
  getMe,
  getUserById,
  getAllUsers,
  updateMe
} from '../controllers/userController.js';

const router = express.Router();

router.use(protect); // all routes below require token

router.get('/me', getMe);
router.patch('/me', validate([
  body('name').optional().notEmpty(),
  body('bio').optional().isString()
]), updateMe);

router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin', 'self'), getUserById);

export default router;