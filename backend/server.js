const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const seedData = require('./seeders/seedData');

// Load environment variables
dotenv.config();

// Initialize Cloudinary
require('./config/cloudinary');

// Connect to Database
connectDB().then(() => {
  // Run seeder to pre-populate gods, mantras, and aartis
  seedData();
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes mapping
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/spiritual', require('./routes/spiritualRoutes'));
app.use('/api/v1/chant', require('./routes/chantRoutes'));
app.use('/api/v1/festivals', require('./routes/festivalRoutes'));
app.use('/api/v1/temples', require('./routes/templeRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/books', require('./routes/bookRoutes'));

// API status check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Spiritual Companion Platform API!' });
});

// Global Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
