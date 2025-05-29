import express from 'express';
import { body } from 'express-validator';
import validate from '../middlewares/validate.js';
import { protect } from '../middlewares/auth.js';
import {
  createRequest,
  getMyRequests,
  updateRequestStatus
} from '../controllers/requestController.js';

const router = express.Router();
router.use(protect);

// Student: Create request
router.post(
  '/',
  validate([
    body('mentorId').notEmpty().withMessage('mentorId is required'),
    body('message').optional().isString()
  ]),
  createRequest
);

// Student: View own requests
router.get('/', getMyRequests);

// Mentor: Accept or reject a request
router.patch(
  '/:id',
  validate([
    body('status').isIn(['accepted', 'rejected'])
  ]),
  updateRequestStatus
);

export default router;