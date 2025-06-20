import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';

const PORT = process.env.PORT || 3000;

async function start() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('✅ MongoDB connected');

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Auth (signup, signin, etc.)
  app.use('/api/auth', authRoutes);

  // User CRUD (protected by clerkAuth)
  app.use('/api/users', userRoutes);

  app.listen(PORT, () =>
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
  );
}
start();