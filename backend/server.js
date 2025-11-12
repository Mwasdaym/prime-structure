const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// VPS Security Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://giftedtech.co.ke', 'http://localhost:3000'] 
    : '*',
  credentials: true
}));

app.use(express.json());

// VPS-specific routes
app.get('/', (req, res) => {
  res.json({
    message: '🎬 Prime Video Clone - VPS Edition',
    version: '1.0.0',
    hosting: 'VPS',
    status: 'Production Ready',
    domain: 'movieapi.giftedtech.co.ke'
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'prime-video-api',
    server: 'VPS',
    timestamp: new Date().toISOString()
  });
});

// Database connection with VPS retry logic
const connectDBWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/primevideo')
    .then(() => console.log('✅ MongoDB Connected on VPS'))
    .catch(err => {
      console.error('❌ MongoDB connection failed, retrying in 5 seconds...', err);
      setTimeout(connectDBWithRetry, 5000);
    });
};

connectDBWithRetry();

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`🎬 Prime Video VPS Server running on ${HOST}:${PORT}`);
});
