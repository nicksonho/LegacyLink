import express from 'express';
import { body } from 'express-validator';
import User from '../models/user.js';
import { requireAuth as clerkAuth } from '../middlewares/clerkAuth.js';
import validate from '../middlewares/validate.js';
import { clerkClient } from '@clerk/clerk-sdk-node';  // 👈 import this

const router = express.Router();

router.post(
  '/signup',
  clerkAuth,
  validate([
    body('name').notEmpty().withMessage('Name is required'),
  ]),
  async (req, res) => {
    try {
      const clerkId = req.auth?.userId;

      // ✅ MANUALLY FETCH user from Clerk
      const clerkUser = await clerkClient.users.getUser(clerkId);
      const email = clerkUser.emailAddresses[0]?.emailAddress;

      if (!clerkId || !email) {
        console.log("❌ Clerk data missing:", { clerkId, email });
        return res.status(400).json({ message: 'Missing clerkId or email' });
      }

      const { name, yearOfStudy, course, interests, bio, profilePicUrl, role } = req.body;

      // Prevent duplicates
      const existing = await User.findOne({ clerkId });
      if (existing) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = await User.create({
        clerkId,
        email,
        name,
        yearOfStudy,
        course,
        interests,
        bio,
        profilePicUrl,
        role,
      });

      console.log("✅ New user created:", user);
      res.status(201).json(user);
    } catch (err) {
      console.error("🛑 Signup error:", err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

export default router;