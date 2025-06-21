import User from '../models/user.js';

// Get current user's profile
export const getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    res.json(req.user);
  } catch (err) {
    console.error('Error returning user profile:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update current user's profile
export const updateMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const updated = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all users (admin-only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-__v'); // Exclude internal MongoDB field
    res.json(users);
  } catch (err) {
    console.error('Error fetching all users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a user by ID (admin-only)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};