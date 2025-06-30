import express from 'express';
import { getMatches } from '../controllers/matchController.js';
import { requireAuth, attachUserData } from '../middlewares/clerkAuth.js'; 

const router = express.Router();

router.get('/recommendations', requireAuth, attachUserData, getMatches);

export default router;