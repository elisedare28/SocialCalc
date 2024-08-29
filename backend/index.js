
import express from 'express';
import {createServer} from 'http';
import { Server as socketIo } from 'socket.io';
import cors from 'cors';
const app = express();
const server = createServer(app);
const io = new socketIo(server,{
  cors:{
    origin: 'http://localhost:5173', // Only allow requests from this origin
    methods: ['GET', 'POST'],
  },
});

// Middleware to handle CORS
app.use(cors());
  
  // Serve static files if needed
  app.use(express.static('public')); // Assumes static files are in the 'public' directory
  
  // Handle WebSocket connections
  io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);
  
    // Handle updates from clients
    socket.on('spreadsheet-update', (data) => {
      console.log(`Data received from ${socket.id}:`, data);
      // Broadcast the update to other clients
      socket.broadcast.emit('spreadsheet-update', data);
      console.log(`Broadcasted update to other clients:`, data);
    });
  
    // Handle disconnections
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  
    // Handle connection errors
    socket.on('error', (error) => {
      console.error(`Socket error: ${error}`);
    });
  
    // Debugging connection details
    socket.on('connect_error', (error) => {
      console.error(`Connection error: ${error.message}`);
    });
    
    // Debugging the list of connected clients
    io.clients((error, clients) => {
      if (error) throw error;
      console.log('Connected clients:', clients);
    });
  });
  
  const PORT = 3000;
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });