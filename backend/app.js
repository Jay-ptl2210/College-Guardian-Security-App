const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const sosRoutes = require('./routes/sosRoutes');
const requestRoutes = require('./routes/requestRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads')); // Static file hosting

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/admin', adminRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('College Guardian Security Backend is Running 🛡️');
});

module.exports = app;
