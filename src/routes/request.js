import express from 'express';
import { requireAuth, attachUserData } from '../middlewares/clerkAuth.js'; ;
import {
  sendRequest,
  getIncomingRequests,
  respondToRequest,
} from '../controllers/requestController.js';

const router = express.Router();

router.post('/', requireAuth, attachUserData, sendRequest);                // student sends request
router.get('/', requireAuth, attachUserData, getIncomingRequests);         // mentor sees incoming
router.patch('/:id', requireAuth, attachUserData, respondToRequest);       // mentor responds

export default router;