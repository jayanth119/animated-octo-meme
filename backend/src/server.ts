import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import mongoose from 'mongoose';
import { Server } from 'socket.io';

dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/business_automation';

const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

import jwt from 'jsonwebtoken';

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Socket events
io.on('connection', (socket) => {
  console.log('🔌 New client connected:', socket.id);
  
  // Extract token from frontend socket handshake auth
  const token = socket.handshake.auth?.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
      const userId = decoded.id;
      socket.join(userId.toString());
      console.log(`👤 Socket Client authenticated: User ${userId} joined room`);
    } catch (err: any) {
      console.error('⚠️ Socket JWT authentication failed:', err.message);
    }
  }

  // Backup explicit join handler
  socket.on('join', (userId) => {
    if (userId) {
      socket.join(userId.toString());
      console.log(`👤 Socket Client manual join: User ${userId}`);
    }
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

export { io };
