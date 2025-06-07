import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

// Middleware to verify Clerk session token
export const requireAuth = ClerkExpressRequireAuth();

// Middleware to check user roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    // Clerk adds the user to req.auth
    const userRole = req.auth?.user?.publicMetadata?.role;
    
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ 
        message: 'Access denied: insufficient role' 
      });
    }
    
    next();
  };
};

// Middleware to get user data from our database
export const attachUserData = async (req, res, next) => {
  try {
    const clerkUserId = req.auth?.userId;
    
    if (!clerkUserId) {
      return res.status(401).json({ message: 'No user ID found' });
    }

    // Find user in our database using Clerk's user ID
    const user = await User.findOne({ clerkId: clerkUserId });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found in database' });
    }

    // Attach user data to request
    req.user = user;
    next();
  } catch (err) {
    console.error('Error attaching user data:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
}; 