import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
import User from '../models/user.js';

export const requireAuth = ClerkExpressWithAuth();

// Optional: restrict access by user role
export const authorize = (...roles) => {
  return (req, res, next) => {
    const role = req.auth?.user?.publicMetadata?.role;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }
    next();
  };
};

// Attach user from MongoDB to req.user
export const attachUserData = async (req, res, next) => {
  try {
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      return res.status(401).json({ message: 'No user ID found' });
    }

    const user = await User.findOne({ clerkId: clerkUserId });
    if (!user) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("Error attaching user data:", err);
    res.status(500).json({ message: 'Internal server error' });
  }
};