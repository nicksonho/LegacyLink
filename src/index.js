import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import matchRoutes from './routes/match.js';
import requestRoutes from './routes/request.js';
import messageRoutes from './routes/message.js';

const PORT = process.env.PORT || 3000;

async function start() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4, // fixes Render DNS issues
    serverSelectionTimeoutMS: 5000
  });
  console.log('✅ MongoDB connected');

  const app = express();
  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*", // In production, specify your frontend URL
      methods: ["GET", "POST"]
    }
  });

  app.use(cors());
  app.use(express.json());

  // Make io accessible in routes
  app.set('io', io);

  // Auth (signup, signin, etc.)
  app.use('/api/auth', authRoutes);

  // for profile.jsx
  app.use('/api/users', userRoutes);

  //for matching
  app.use('/api/match', matchRoutes);

  //for requests
  app.use('/api/requests', requestRoutes);

  // for chat messages
  app.use('/api/messages', messageRoutes);

  // Socket.IO connection handling
  io.on('connection', (socket) => {
    console.log('👤 User connected:', socket.id);

    // Join a chat room
    socket.on('join_chat', (chatId) => {
      socket.join(chatId);
      console.log(`👤 User ${socket.id} joined chat: ${chatId}`);
    });

    // Leave a chat room
    socket.on('leave_chat', (chatId) => {
      socket.leave(chatId);
      console.log(`👤 User ${socket.id} left chat: ${chatId}`);
    });

    // Handle new messages
    socket.on('send_message', (messageData) => {
      // Broadcast to all users in the chat room except sender
      socket.to(messageData.chatId).emit('receive_message', messageData);
    });

    socket.on('disconnect', () => {
      console.log('👤 User disconnected:', socket.id);
    });
  });

  server.listen(PORT, () =>
    console.log(`🚀 Server listening on http://localhost:${PORT}`)
  );
}
start();