import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import User from '../../backend/models/user.js';
import { generateToken } from '../utils/generateToken.js';

console.log('🧠 Mongoose readyState:', mongoose.connection.readyState);
console.log('🧪 User model loaded:', typeof User === 'function' ? '✅ YES' : '❌ NO');

export async function register(req, res) {
  const { name, email, password, yearOfStudy, course, interests, bio, profilePicUrl } = req.body;

  try {
    console.log('📡 Testing direct MongoDB call...');
    const test = await mongoose.connection.db.collection('users').findOne({});
    console.log('✅ Direct DB result:', test);

    console.log('🔍 Running User.findOne...');
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log('❗ Email already exists');
      return res.status(409).json({ message: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, passwordHash, yearOfStudy, course, interests, bio, profilePicUrl
    });

    const token = generateToken(user._id, user.role);
    const { passwordHash: _, ...userData } = user.toObject();

    res.status(201).json({ token, user: userData });
  } catch (err) {
    console.error('❌ REGISTER ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user._id, user.role);
    const { passwordHash: _, ...userData } = user.toObject();

    res.json({ token, user: userData });
  } catch (err) {
    console.error('❌ LOGIN ERROR:', err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
}