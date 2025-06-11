import express from 'express';
import { body } from 'express-validator';
import User from '../models/user.js';
import clerkAuth from '../middlewares/clerkAuth.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.post(
  '/signup',
  clerkAuth,
  validate([ body('name').notEmpty().withMessage('Name is required') ]),
  async (req, res) => {
    const { userId: clerkId } = req;          // from clerkAuth
    const { name, yearOfStudy, course, interests, bio, profilePicUrl, role } = req.body;
    if (await User.findOne({ clerkId })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ clerkId, name, yearOfStudy, course, interests, bio, profilePicUrl, role });
    res.status(201).json(user);
  }
);

export default router;