import User from '../../backend/models/user.js';

export async function getMe(req, res) {
  const user = await User.findById(req.user.id).select('-passwordHash');
  res.json(user);
}

export async function updateMe(req, res) {
  const updates = req.body;
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true }).select('-passwordHash');
  res.json(user);
}

export async function getAllUsers(req, res) {
  const users = await User.find().select('-passwordHash');
  res.json(users);
}

export async function getUserById(req, res) {
  const user = await User.findById(req.params.id).select('-passwordHash');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
}