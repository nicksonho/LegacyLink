// Main switchboard of your app: starts the server, connects to MongoDB, and loads all routes.

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';

const app = express(); // ✅ Create express app instance
app.use(express.json()); // ✅ Enable parsing of JSON requests

// ✅ Connect to MongoDB BEFORE loading routes
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/LegacyLink_v1')
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // ✅ Route imports go here *after* DB is connected
    import('./routes/auth.js').then(({ default: authRoutes }) =>
      app.use('/api/auth', authRoutes)
    );
    import('./routes/users.js').then(({ default: userRoutes }) =>
      app.use('/api/users', userRoutes)
    );
    import('./routes/mentors.js').then(({ default: mentorRoutes }) =>
      app.use('/api/mentors', mentorRoutes)
    );
    import('./routes/requests.js').then(({ default: requestRoutes }) =>
      app.use('/api/requests', requestRoutes)
    );
    import('./routes/message.js').then(({ default: messageRoutes }) =>
      app.use('/api/messages', messageRoutes)
    );
    import('./routes/notification.js').then(({ default: notificationRoutes }) =>
      app.use('/api/notifications', notificationRoutes)
    );

    // ✅ Start server
    app.listen(3000, () => {
      console.log('✅ Server running on http://localhost:3000');
    });
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));