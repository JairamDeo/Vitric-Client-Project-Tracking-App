// /index.js
const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection
const mongoDB = require("./config/db");
mongoDB();

const port = process.env.PORT || 5000;
const FrontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';

// CORS Configuration (simplified - you had duplicate cors middleware)
const corsOptions = {
  origin: FrontendURL,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Test Route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Client Project Tracker API',
    version: '1.0.0',
    status: 'Running',
    endpoints: {
      clients: '/api/clients',
      projects: '/api/projects',
      admin: '/api/admin',
    }
  });
});

// API Routes
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(port, () => {
  console.log(`\n🚀 Server running in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`📡 Server listening on port ${port}`);
  console.log(`🌐 API URL: http://localhost:${port}`);
  console.log(`✅ CORS enabled for: ${FrontendURL}\n`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
  process.exit(1);
});