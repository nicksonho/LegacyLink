import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { protect, authorize } from '../middlewares/auth.js';
import {
  createMentor,
  getMentorById,
  getAllMentors,
  updateMentor
} from '../controllers/mentorController.js';

const router = express.Router();

router.get('/', getAllMentors); // public or logged-in users
router.get('/:id', protect, getMentorById);

router.post(
  '/',
  protect,
  authorize('mentor'),
  validate([
    body('industry').notEmpty(),
    body('expertise').isArray(),
    body('bio').notEmpty(),
    body('availability').notEmpty()
  ]),
  createMentor
);

router.patch(
  '/:id',
  protect,
  authorize('self'),
  validate([
    body('bio').optional().isString(),
    body('availability').optional().isString()
  ]),
  updateMentor
);

export default router;