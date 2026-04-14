import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { tickSimulation, getApiCrowdState, getApiAlerts, getApiPredictions } from './sockets/handler.js';

const app = express();
app.use(cors({ origin: '*' }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  }
});

// REST API Fallback
app.get('/api/crowd', (req, res) => {
  res.json(getApiCrowdState());
});

app.get('/api/alerts', (req, res) => {
  res.json(getApiAlerts());
});

app.get('/api/predictions', (req, res) => {
  res.json(getApiPredictions());
});

// Socket.io Events
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Initial payload sync whenever a new client connects
  socket.emit('crowdUpdate', getApiCrowdState());
  socket.emit('alertUpdate', getApiAlerts());
  socket.emit('predictionUpdate', getApiPredictions());

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start Simulation Interval (Runs every 3.5 seconds)
setInterval(() => {
  tickSimulation(io);
}, 3500);

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`StadiumFlow AI Backend running on port ${PORT}`);
});
