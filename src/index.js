// index.js
import 'dotenv/config';            
import express from 'express';
import mongoose from 'mongoose';   
import userRoutes from './routes/users.js';
//import mentorRoutes from './routes/mentors.js';
//import messageRoutes from './routes/message.js';
//import requestRoutes from './routes/requests.js';
//import notificationRoutes from './routes/notification.js';


const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // 3) await the connect before doing anything else
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('✅ MongoDB connected');
    console.log('🔦 readyState after connect:', mongoose.connection.readyState); // should print 1

    const app = express();
    app.use(express.json());

    // 4) mount your routes synchronously
    app.use('/api/users', userRoutes);
 //   app.use('/api/mentors', mentorRoutes);
 //   app.use('/api/messages', messageRoutes);
 //   app.use('/api/requests', requestRoutes);
 //   app.use('/api/notifications', notificationRoutes);

    app.listen(PORT, () =>
      console.log(`🚀 Server listening on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

start();