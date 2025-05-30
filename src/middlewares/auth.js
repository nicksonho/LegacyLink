import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Mentor from '../models/mentor.js';

export async function protect(req, res, next) {
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role };

    // Optional: attach full user data (based on role)
    if (decoded.role === 'student') {
      req.user.data = await User.findById(decoded.id).select('-passwordHash');
    } else if (decoded.role === 'mentor') {
      req.user.data = await Mentor.findById(decoded.id).select('-passwordHash');
    }

    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

export function authorize(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient role' });
    }
    next();
  };
}