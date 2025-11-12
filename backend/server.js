const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/primevideo');
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: '🎬 Prime Video Clone API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: '/api/auth',
      movies: '/api/movies',
      users: '/api/users'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    service: 'prime-video-api',
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🎬 Prime Video Server running on port ${PORT}`);
    console.log(`📍 API URL: http://localhost:${PORT}`);
  });
});

module.exports = app;
