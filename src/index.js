// index.js
import 'dotenv/config';            // 1) load env first
import express from 'express';
import mongoose from 'mongoose';   // 2) single mongoose instance
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
// …other routers

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    // 3) await the connect before doing anything else
    await mongoose.connect(process.env.MONGODB_URI, {
      // no need for useNewUrlParser/useUnifiedTopology in Mongoose 6+
    });
    console.log('✅ MongoDB connected');
    console.log('🔦 readyState after connect:', mongoose.connection.readyState); // should print 1

    const app = express();
    app.use(express.json());

    // 4) mount your routes synchronously
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);
    // …etc

    app.listen(PORT, () =>
      console.log(`🚀 Server listening on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err);
    process.exit(1);
  }
}

start();