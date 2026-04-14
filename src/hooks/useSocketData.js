import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const BACKEND_URL = 'http://localhost:3001';

export function useSocketData() {
  const [stadiumState, setStadiumState] = useState({
    zones: {},
    global: { totalAttendees: 0, maxCapacity: 0, averageWait: 0 }
  });
  const [alerts, setAlerts] = useState([]);
  const [prediction, setPrediction] = useState({ nextHotspot: null, expectedIn: 0 });
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Initialize Socket Connection
    const socket = io("https://stadiumflow-backend.onrender.com", {
      transports: ["websocket"]
    });

    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('crowdUpdate', (data) => {
      setStadiumState(data);
    });

    socket.on('alertUpdate', (data) => {
      setAlerts(data);
    });

    socket.on('predictionUpdate', (data) => {
      setPrediction(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { stadiumState, alerts, prediction, isConnected };
}
