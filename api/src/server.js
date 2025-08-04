const express = require('express');
require('dotenv').config();
const connectDB = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.FRONTEND_URL, // Your frontend URL
  credentials: true
}));

// Mount Routes
app.use('/api', userRoutes);
app.use('/api', postRoutes);

app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Connect DB and start server
connectDB()
  .then(() => {
    console.log("✅ Database connected");
    app.listen(process.env.PORT || 8080, () => {
      console.log(`🚀 Server running on port ${process.env.PORT || 8080}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err.message);
  });
